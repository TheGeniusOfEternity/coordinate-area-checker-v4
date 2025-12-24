package entities

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.Index
import jakarta.persistence.Table
import java.time.Instant

@Table(name="refresh_tokens", indexes = [
    Index(name = "idx_jti", columnList = "jti", unique = true),
    Index(name = "idx_cleanup", columnList = "expires_at")
])
@Entity
data class RefreshTokenEntity (
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    @Column
    val jti: String,

    @Column("expires_at")
    val expiresAt: Instant,
)