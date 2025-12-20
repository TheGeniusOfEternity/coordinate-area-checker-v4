package repositories

import entities.UserEntity
import jakarta.ejb.Stateless
import jakarta.persistence.EntityManager
import jakarta.persistence.PersistenceContext

@Stateless
class UserRepository {

    @PersistenceContext
    private lateinit var em: EntityManager

    fun getById(id: Long): UserEntity? =
        em.find(UserEntity::class.java, id)

    fun getByEmail(email: String): UserEntity? =
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
        val existing = getById(id) ?: return null
        em.merge(existing)
        em.flush()
        return existing
    }
}
