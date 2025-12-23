package dto.shots

import org.jetbrains.annotations.NotNull

data class ShotRequestDTO(
    @NotNull
    val x: Float,

    @NotNull
    val y: Float,

    @NotNull
    val r: Float
)