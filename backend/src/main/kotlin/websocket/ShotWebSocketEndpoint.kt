package websocket

import jakarta.inject.Inject
import jakarta.websocket.OnClose
import jakarta.websocket.OnMessage
import jakarta.websocket.OnOpen
import jakarta.websocket.Session
import jakarta.websocket.server.ServerEndpoint
import services.ShotWebSocketService

@ServerEndpoint("/api/ws/shots")
class ShotWebSocketEndpoint {
    @Inject private lateinit var webSocketService: ShotWebSocketService

    @OnOpen
    fun onOpen(session: Session) {
        webSocketService.addSession(session.id, session)
        webSocketService.sendShotsSync(session)
    }

    @OnClose
    fun onClose(session: Session) {
        webSocketService.removeSession(session.id)
    }
}