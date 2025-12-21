package services

import dto.shots.ShotResponseDTO
import extensions.toJson
import jakarta.enterprise.context.ApplicationScoped
import jakarta.inject.Inject
import jakarta.websocket.Session
import java.util.concurrent.ConcurrentHashMap

@ApplicationScoped
class ShotWebSocketService {

    private val sessions = ConcurrentHashMap<String, Session>()
    @Inject
    private lateinit var shotService: ShotService

    fun addSession(sessionId: String, session: Session) {
        sessions[sessionId] = session
    }

    fun removeSession(sessionId: String) {
        sessions.remove(sessionId)
    }

    fun sendShotsSync(session: Session) {
        val allShots = shotService.getAll()
        val message = mapOf(
            "type" to "shots:sync",
            "shots" to allShots
        ).toJson()
        session.basicRemote.sendText(message)
    }

    fun broadcastNewShot(shot: ShotResponseDTO) {
        val message = mapOf(
            "type" to "shot:added",
            "shot" to shot
        ).toJson()

        sessions.values.forEach { session ->
            if (session.isOpen) {
                session.basicRemote.sendText(message)
            }
        }
    }
}
