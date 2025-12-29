package services

import com.auth0.jwt.JWT
import com.auth0.jwt.algorithms.Algorithm
import com.auth0.jwt.interfaces.DecodedJWT
import entities.RefreshTokenEntity
import entities.UserEntity
import jakarta.enterprise.context.ApplicationScoped
import jakarta.inject.Inject
import repositories.RefreshTokenRepository
import java.time.Duration
import java.time.Instant
import java.util.Date
import java.util.UUID

@ApplicationScoped
class JWTService {
    @Inject
    private lateinit var refreshTokenRepository: RefreshTokenRepository

    private val secret = "GOIDA_SECRET"
    private val accessTokenDuration = Duration.ofSeconds(10)
    private val refreshTokenDuration = Duration.ofDays(7)

    private val algorithm = Algorithm.HMAC256(secret)

    fun generateAccessToken(user: UserEntity): String {
        val now = Instant.now()
        val expiresAt = now.plus(accessTokenDuration)

        val userData = mapOf(
            "id" to user.id,
            "email" to user.email,
            "name" to user.name,
            "surname" to user.surname,
            "patronymic" to user.patronymic,
            "studyGroup" to user.studyGroup,
        )

        return JWT.create()
            .withJWTId(UUID.randomUUID().toString())
            .withSubject(user.id.toString())
            .withClaim("user", userData)
            .withIssuedAt(Date.from(now))
            .withExpiresAt(Date.from(expiresAt))
            .sign(algorithm)
    }

    fun generateRefreshToken(userId: Long): String {
        val now = Instant.now()
        val expiresAt = now.plus(refreshTokenDuration)
        val jti = UUID.randomUUID().toString()

        val token = JWT.create()
            .withJWTId(jti)
            .withSubject(userId.toString())
            .withIssuedAt(Date.from(now))
            .withExpiresAt(Date.from(expiresAt))
            .sign(algorithm)
        val tokenEntity = RefreshTokenEntity(
            jti = jti,
            expiresAt = expiresAt
        )
        refreshTokenRepository.create(tokenEntity)

        return token
    }

    fun verifyToken(token: String): DecodedJWT? {
        return runCatching {
            val decoded = JWT.require(algorithm)
                .build()
                .verify(token)
            decoded
        }.getOrNull()
    }
}