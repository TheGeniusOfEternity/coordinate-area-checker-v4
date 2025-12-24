package services

import dto.auth.LoginRequestDTO
import dto.auth.RegisterRequestDTO
import entities.UserEntity
import exceptions.IncorrectAuthDataException
import exceptions.InvalidTokenException
import exceptions.UserAlreadyExistsException
import exceptions.UserNotFoundException
import jakarta.enterprise.context.ApplicationScoped
import jakarta.inject.Inject
import repositories.RefreshTokenRepository
import repositories.UserRepository

data class AuthTokens(
    val accessToken: String,
    val refreshToken: String
)

@ApplicationScoped
class AuthService {

    @Inject
    private lateinit var hashService: HashService

    @Inject
    private lateinit var jwtService: JWTService

    @Inject
    private lateinit var userRepository: UserRepository

    @Inject
    private lateinit var refreshTokenRepository: RefreshTokenRepository

    fun login(requestDTO: LoginRequestDTO): AuthTokens {
        val user = userRepository.getByEmail(requestDTO.email)
            ?: throw UserNotFoundException("email ${requestDTO.email}")
        if (!hashService.verifyCredentials(requestDTO.password, user.passwordHash))
            throw IncorrectAuthDataException()

        val accessToken = jwtService.generateAccessToken(user)
        val refreshToken = jwtService.generateRefreshToken(user.id!!)

        return AuthTokens(accessToken, refreshToken)
    }

    fun register(requestDTO: RegisterRequestDTO): AuthTokens {
        if (userRepository.getByEmail(requestDTO.email) != null)
            throw UserAlreadyExistsException()
        val hash = hashService.hashCredentials(requestDTO.password)
        userRepository.create(requestDTO.toEntity(hash))
        return login(LoginRequestDTO(requestDTO.email, requestDTO.password))
    }

    fun refreshAccessToken(refreshToken: String): String {
        val refreshDecoded = jwtService.verifyToken(refreshToken)
            ?: run {
                println("verification failed")
                throw InvalidTokenException()
            }
        val userId = refreshDecoded.subject.toLong()
        val jti = refreshDecoded.id

        refreshTokenRepository.getByJti(jti)
            ?: run {
                println("token not found in db")
                throw InvalidTokenException()
            }

        val user = userRepository.getById(userId)
            ?: throw UserNotFoundException("user $userId")

        val newAccessToken = jwtService.generateAccessToken(user)

        return newAccessToken
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