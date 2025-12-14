package dto.validation

data class ValidationErrorResponseDTO(
    val field: String,
    val message: String,
)