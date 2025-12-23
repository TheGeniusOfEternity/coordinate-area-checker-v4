package services

import com.auth0.jwt.JWT
import com.auth0.jwt.algorithms.Algorithm
import jakarta.enterprise.context.ApplicationScoped
import jakarta.inject.Inject
import java.time.Duration
import java.time.Instant
import java.util.Date

@ApplicationScoped
class JWTService {
    @Inject
    private lateinit var userService: UserService

    private val secret = "GOIDA_SECRET"
    private val duration = Duration.ofSeconds(30)

    private val algorithm = Algorithm.HMAC256(secret)

    fun generateToken(userId: Long): String {
        val now = Instant.now()
        val expiresAt = now.plus(duration)

        val user = userService.getById(userId)
        val userData = mapOf(
            "id" to user.id,
            "email" to user.email,
            "name" to user.name,
            "surname" to user.surname,
            "patronymic" to user.patronymic,
            "studyGroup" to user.studyGroup,
        )

        return JWT.create()
            .withSubject(userId.toString())
            .withClaim("user", userData)
            .withIssuedAt(Date.from(now))
            .withExpiresAt(Date.from(expiresAt))
            .sign(algorithm)
    }

    fun verifyToken(token: String): Long? {
        return runCatching {
            val decoded = JWT.require(algorithm)
                .build()
                .verify(token)
            decoded.subject.toLong()
        }.getOrNull()
    }
}