package repositories

import entities.UserEntity
import jakarta.enterprise.context.ApplicationScoped
import jakarta.persistence.EntityManager
import jakarta.persistence.PersistenceContext

@ApplicationScoped
class UserRepository {

    @PersistenceContext
    private lateinit var em: EntityManager

    fun findById(id: Long): UserEntity? =
        em.find(UserEntity::class.java, id)

    fun findByEmail(email: String): UserEntity? =
        em.createQuery(
            "SELECT u FROM UserEntity u WHERE u.email = :email",
            UserEntity::class.java
        )
            .setParameter("email", email)
            .resultList
            .firstOrNull()

    fun save(user: UserEntity): UserEntity {
        em.persist(user)
        em.flush()
        return user
    }

    fun update(id: Long): UserEntity? {
        val existing = findById(id) ?: return null
        em.merge(existing)
        em.flush()
        return existing
    }
}
