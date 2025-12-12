package dto.common

data class CommonResponseDTO<T>(
    val status: Int,
    val message: T
)
