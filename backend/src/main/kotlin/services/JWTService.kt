package services

import com.auth0.jwt.JWT
import com.auth0.jwt.algorithms.Algorithm
import jakarta.enterprise.context.ApplicationScoped
import java.time.Duration
import java.time.Instant
import java.util.Date

@ApplicationScoped
class JWTService {
    private val secret = "GOIDA_SECRET"
    private val duration = Duration.ofSeconds(30)

    private val algorithm = Algorithm.HMAC256(secret)

    fun generateToken(userId: Long): String {
        val now = Instant.now()
        val expiresAt = now.plus(duration)

        return JWT.create()
            .withSubject(userId.toString())
            .withIssuedAt(Date.from(now ))
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