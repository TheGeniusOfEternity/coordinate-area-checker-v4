package services

import com.fasterxml.jackson.databind.JsonNode
import dto.shots.ShotRequestDTO
import dto.shots.ShotResponseDTO
import exceptions.UserNotFoundException
import exceptions.WebSocketNoDataException
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

    fun createShot(json: JsonNode, session: Session) {
        val userId = session.userProperties["id"]
        if (userId == null || userId !is Long) {
            session.close()
            throw UserNotFoundException(userId.toString())
        }
        val shot = json.get("shot")
            ?: throw WebSocketNoDataException()
        val shotRequestDto = ShotRequestDTO(
            x = shot.get("x").asDouble().toFloat(),
            y = shot.get("y").asDouble().toFloat(),
            r = shot.get("r").asDouble().toFloat(),
        )

        val shotResponseDto = shotService.create(shotRequestDto, userId)
        broadcastNewShot(shotResponseDto)
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

    fun broadcastAllShots() {
        val allShots = shotService.getAll()
        val message = mapOf(
            "type" to "shots:sync",
            "shots" to allShots
        ).toJson()

        sessions.values.forEach { session ->
            if (session.isOpen) {
                session.basicRemote.sendText(message)
            }
        }
    }
}
