package dto.auth

import jakarta.validation.constraints.Email
import jakarta.validation.constraints.NotBlank

data class RegisterRequestDTO(
    @Email(message = "Email must be valid")
    @NotBlank(message = "Email cannot be blank")
    val email: String,

    @NotBlank(message = "Password cannot be blank")
    val password: String,

    @NotBlank(message = "Name cannot be blank")
    val name: String,

    @NotBlank(message = "Surname cannot be blank")
    val surname: String,

    @NotBlank(message = "Patronymic cannot be blank")
    val patronymic: String,

    @NotBlank(message = "Group cannot be blank")
    val studyGroup: String,
)