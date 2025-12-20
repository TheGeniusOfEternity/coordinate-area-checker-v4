package dto.shots

import com.fasterxml.jackson.annotation.JsonFormat
import java.time.Instant

data class ShotResponseDTO(
    val id: Long,
    val userId: Long,
    val x: Float,
    val y: Float,
    val r: Float,
    val isHit: Boolean,

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss'Z'")
    val hitTime: Instant,
    val executionTime: Long,
)