package entities

import jakarta.persistence.*
import java.time.Instant

@Entity
@Table(name = "users")
data class UserEntity(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    @Column(unique = true, nullable = false)
    val email: String,

    @Column(nullable = false)
    val name: String,

    @Column(nullable = false)
    val surname: String,

    @Column(nullable = false)
    val patronymic: String,

    @Column(nullable = false)
    val studyGroup: String,

    @Column(nullable = false)
    val passwordHash: String,

    @Column(nullable = false)
    val createdAt: Instant = Instant.now(),

    @OneToMany
    val shots: MutableList<ShotEntity> = mutableListOf(),
)

