package services

import dto.auth.LoginRequestDTO
import dto.auth.AuthResponseDTO
import dto.auth.RegisterRequestDTO
import dto.common.CommonResponseDTO
import entities.UserEntity
import exceptions.IncorrectPasswordException
import exceptions.InvalidTokenException
import exceptions.UserAlreadyExistsException
import exceptions.UserNotFoundException
import jakarta.enterprise.context.ApplicationScoped
import jakarta.inject.Inject
import repositories.UserRepository

@ApplicationScoped
class AuthService {
    @Inject
    private lateinit var userRepository: UserRepository

    @Inject
    private lateinit var passwordService: PasswordService

    @Inject
    private lateinit var jwtService: JWTService

    fun login(requestDTO: LoginRequestDTO): CommonResponseDTO<AuthResponseDTO> {
        val user = userRepository.findByEmail(requestDTO.email)
            ?: throw UserNotFoundException(requestDTO.email)
        if (!passwordService.verifyPassword(requestDTO.password, user.passwordHash))
            throw IncorrectPasswordException()
        val token = jwtService.generateToken(user.id!!)
        return CommonResponseDTO(
            200,
            AuthResponseDTO(token)
        )
    }

    fun register(requestDTO: RegisterRequestDTO): CommonResponseDTO<AuthResponseDTO> {
        if (userRepository.findByEmail(requestDTO.email) != null)
            throw UserAlreadyExistsException()
        val hash = passwordService.hashPassword(requestDTO.password)
        userRepository.save(requestDTO.toEntity(hash))
        return login(LoginRequestDTO(requestDTO.email, requestDTO.password))
    }

    fun refreshJWT(oldToken: String): CommonResponseDTO<AuthResponseDTO> {
        val userId = jwtService.verifyToken(oldToken)
            ?: throw InvalidTokenException()

        val newToken = jwtService.generateToken(userId)
        return CommonResponseDTO(
            200,
            AuthResponseDTO(newToken)
        )
    }

    private fun RegisterRequestDTO.toEntity(passwordHash: String): UserEntity {
        return UserEntity(
            email = email,
            name = name,
            surname = surname,
            patronymic = patronymic,
            studyGroup = studyGroup,
            passwordHash = passwordHash,
        )
    }
}