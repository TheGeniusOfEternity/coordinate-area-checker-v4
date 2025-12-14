package dto.common

data class CommonResponseDTO<T>(
    val status: Int,
    val data: T,
)
