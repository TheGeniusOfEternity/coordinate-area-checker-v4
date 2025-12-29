package websocket

import com.auth0.jwt.interfaces.DecodedJWT
import extensions.jsonMapper
import jakarta.inject.Inject
import jakarta.websocket.OnClose
import jakarta.websocket.OnMessage
import jakarta.websocket.OnOpen
import jakarta.websocket.Session
import jakarta.websocket.server.ServerEndpoint
import services.JWTService
import services.ShotWebSocketService
import java.net.URLDecoder

@ServerEndpoint("/api/ws/shots")
class ShotWebSocketEndpoint {

    @Inject
    private lateinit var webSocketService: ShotWebSocketService

    @Inject
    private lateinit var jwtService: JWTService

    @OnOpen
    fun onOpen(session: Session) {

        val jwtData = checkAccessToken(session) ?: return

        val userId = jwtData.subject.toLong()

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
        checkAccessToken(session) ?: return

        val json = jsonMapper.readTree(message)
        val type = json.get("type")?.asText()
        when (type) {
            "shot:create" -> webSocketService.createShot(json, session)
        }
    }

    private fun checkAccessToken(session: Session): DecodedJWT? {
        return session.requestURI.query
            ?.split("&")
            ?.firstNotNullOfOrNull { it.split("=").getOrNull(1)?.let { URLDecoder.decode(it, "UTF-8") } }
            ?.let { token ->
                jwtService.verifyToken(token) ?: run {
                    sendError(session, "Invalid token")
                    null
                }
            }
            ?: run {
                sendError(session, "No token provided")
                null
            }
    }

    private fun sendError(session: Session, message: String, status: Int = 401) {
        runCatching {
            if (session.isOpen) {
                session.basicRemote.sendText(
                    jsonMapper.writeValueAsString(mapOf(
                        "type" to "error",
                        "message" to message,
                        "status" to status
                    ))
                )
            }
        }
        session.close()
    }
}