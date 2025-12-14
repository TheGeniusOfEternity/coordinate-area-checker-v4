package dto.auth

import jakarta.validation.constraints.Email
import jakarta.validation.constraints.NotBlank

data class LoginRequestDTO (
    @NotBlank(message = "Email cannot be blank")
    @Email(message = "Email must be valid")
    val email: String,

    @NotBlank(message = "Password cannot be blank")
    val password: String
)