package services

import dto.shots.ShotResponseDTO
import entities.ShotEntity
import jakarta.enterprise.context.ApplicationScoped
import jakarta.inject.Inject
import repositories.ShotRepository

@ApplicationScoped
class ShotService {
    @Inject
    private lateinit var shotRepository: ShotRepository

    fun getAll(): List<ShotResponseDTO> {
        val shots = shotRepository.getAll()
        return shots.map { it.toDto() }
    }

    private fun ShotEntity.toDto(): ShotResponseDTO {
        val (id, user, x, y, r, isHit, hitTime, executionTime) = this
        return ShotResponseDTO(id!!, user.id!!, x, y, r, isHit, hitTime, executionTime)
    }
}