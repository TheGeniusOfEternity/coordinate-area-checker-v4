package entities

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.FetchType
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.JoinColumn
import jakarta.persistence.ManyToOne
import jakarta.persistence.Table
import java.time.Instant

@Entity
@Table(name = "shots")
data class ShotEntity (
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    @ManyToOne
    @JoinColumn(name = "user_id")
    val user: UserEntity,

    @Column(nullable = false)
    val x: Float,

    @Column(nullable = false)
    val y: Float,

    @Column(nullable = false)
    val r: Float,

    @Column(name = "is_hit", nullable = false)
    val isHit: Boolean,

    @Column(name = "hit_time", nullable = false)
    val hitTime: Instant = Instant.now(),

    @Column(name = "execution_time", nullable = false)
    val executionTime: Long,
)