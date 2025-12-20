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

    @Column(name = "study_group", nullable = false)
    val studyGroup: String,

    @Column(name = "password_hash", nullable = false)
    val passwordHash: String,

    @Column(name = "created_at", nullable = false)
    val createdAt: Instant = Instant.now(),

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = [CascadeType.ALL])
    val shots: MutableList<ShotEntity> = mutableListOf(),
)

