package websocket

import extensions.jsonMapper
import jakarta.inject.Inject
import jakarta.websocket.OnClose
import jakarta.websocket.OnMessage
import jakarta.websocket.OnOpen
import jakarta.websocket.Session
import jakarta.websocket.server.ServerEndpoint
import services.JWTService
import services.ShotService
import services.ShotWebSocketService
import java.net.URLDecoder

@ServerEndpoint("/api/ws/shots")
class ShotWebSocketEndpoint {

    @Inject
    private lateinit var webSocketService: ShotWebSocketService

    @Inject
    private lateinit var jwtService: JWTService

    @Inject
    private lateinit var shotService: ShotService

    @OnOpen
    fun onOpen(session: Session) {
        val token = session.requestURI.query
            .split("&")
            .firstNotNullOfOrNull { param ->
                val parts = param.split("=")
                URLDecoder.decode(parts[1], "UTF-8")
            }
            ?: return sendError(session, "No token provided", 4001)

        val userId = jwtService.verifyToken(token)
            ?: return sendError(session, "Invalid token", 4002)

        session.userProperties["id"] = userId

        webSocketService.addSession(session.id, session)
        webSocketService.sendShotsSync(session)
    }

    @OnClose
    fun onClose(session: Session) {
        webSocketService.removeSession(session.id)
    }

    @OnMessage
    fun onMessage(session: Session, message: String) {
        val json = jsonMapper.readTree(message)
        val type = json.get("type")?.asText()
        when (type) {
            "shot:create" -> webSocketService.createShot(json, session)
        }
    }

    private fun sendError(session: Session, message: String, code: Int) {
        runCatching {
            if (session.isOpen) {
                session.basicRemote.sendText(
                    jsonMapper.writeValueAsString(mapOf(
                        "type" to "error",
                        "message" to message,
                        "code" to code
                    ))
                )
            }
        }
        session.close()
    }
}