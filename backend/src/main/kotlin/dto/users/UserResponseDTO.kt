package dto.users

data class UserResponseDTO(
    val id: Long,
    val email: String,
    val name: String,
    val surname: String,
    val patronymic: String,
    val studyGroup: String,
)