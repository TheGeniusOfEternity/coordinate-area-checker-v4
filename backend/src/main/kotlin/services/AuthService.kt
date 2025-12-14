package services

import dto.auth.LoginRequestDTO
import dto.auth.LoginResponseDTO
import dto.common.CommonResponseDTO
import exceptions.IncorrectPasswordException
import exceptions.UserNotFoundException
import jakarta.ejb.Stateless
import jakarta.enterprise.context.ApplicationScoped
import jakarta.inject.Inject
import repositories.UserRepository

@ApplicationScoped
class AuthService {
    @Inject
    private lateinit var userRepository: UserRepository

    @Inject
    private lateinit var passwordService: PasswordService

    fun login(requestDTO: LoginRequestDTO): CommonResponseDTO<LoginResponseDTO> {
        val user = userRepository.findByEmail(requestDTO.email)
            ?: throw UserNotFoundException(requestDTO.email)
        if (!passwordService.verifyPassword(requestDTO.password, user.passwordHash))
            throw IncorrectPasswordException()
        return CommonResponseDTO(
            200,
            LoginResponseDTO(
                "token"
            )
        )
    }
}