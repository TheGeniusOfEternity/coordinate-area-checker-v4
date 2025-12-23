package dto.shots

data class ShotResponseDTO(
    val id: Long,
    val userId: Long,
    val x: Float,
    val y: Float,
    val r: Float,
    val isHit: Boolean,

    val hitTime: String,
    val executionTime: Long,
)