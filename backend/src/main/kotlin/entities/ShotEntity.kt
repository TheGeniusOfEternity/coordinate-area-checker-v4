package entities

import jakarta.persistence.Column
import jakarta.persistence.Entity
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

    @Column
    val x: Float,

    @Column
    val y: Float,

    @Column
    val r: Float,

    @Column
    val isHit: Boolean,

    @Column(nullable = false)
    val hitTime: Instant = Instant.now(),

    @Column
    val executionTime: Long,
)