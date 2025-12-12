package services

import dto.auth.LoginRequestDTO
import dto.auth.LoginResponseDTO
import dto.common.CommonResponseDTO
import exceptions.UserNotFoundException
import jakarta.enterprise.context.ApplicationScoped
import jakarta.inject.Inject
import jakarta.validation.Valid
import repositories.UserRepository

@ApplicationScoped
class AuthService {
    @Inject
    private lateinit var userRepository: UserRepository

    fun login(@Valid requestDTO: LoginRequestDTO): CommonResponseDTO<LoginResponseDTO> {
        val user = userRepository.findByEmail(requestDTO.email)
            ?: throw UserNotFoundException(requestDTO.email)

        return CommonResponseDTO(
            200,
            LoginResponseDTO(
                "success! creds are:\n ${requestDTO.email} | ${requestDTO.password}"
            )
        )
    }
}