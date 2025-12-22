package services

import dto.shots.ShotRequestDTO
import dto.shots.ShotResponseDTO
import entities.ShotEntity
import exceptions.UserNotFoundException
import jakarta.enterprise.context.ApplicationScoped
import jakarta.inject.Inject
import repositories.ShotRepository
import repositories.UserRepository
import java.time.ZoneId
import kotlin.time.TimeSource

@ApplicationScoped
class ShotService {
    @Inject
    private lateinit var shotRepository: ShotRepository

    @Inject
    private lateinit var userRepository: UserRepository

    fun getAll(): List<ShotResponseDTO> {
        val shots = shotRepository.getAll()
        return shots.map { it.toDto() }
    }

    fun create(shotDTO: ShotRequestDTO): ShotResponseDTO {
        val execStart = TimeSource.Monotonic.markNow()
        val user = userRepository.getById(shotDTO.userId)
            ?: throw UserNotFoundException(shotDTO.userId.toString())
        val shot = shotRepository.create(ShotEntity(
            user = user,
            x = shotDTO.x,
            y = shotDTO.y,
            r = shotDTO.r,
            isHit = isHit(shotDTO.x, shotDTO.y, shotDTO.r),
            executionTime = execStart.elapsedNow().inWholeMilliseconds,
        ))
        return shot.toDto()
    }

    fun removeAll(): Int {
        return shotRepository.deleteAll()
    }

    private fun ShotEntity.toDto(): ShotResponseDTO =
        ShotResponseDTO(id!!, user.id!!, x, y, r, isHit,
            hitTime
                .atZone(ZoneId.systemDefault())
                .toLocalDateTime()
                .toString(),
            executionTime
        )

    private fun isHit(x: Float, y: Float, r: Float): Boolean {
        // 1. Четверть круга
        if (x <= 0 && y >= 0 && x *x + y*y <= r*r) return true
        // 2. Прямоугольник
        if (x >= 0 && y >= 0 && x <= r/2 && y <= r) return true
        // 3. Треугольник
        return (x >= 0 && y <= 0 && y >= x - r)
    }
}