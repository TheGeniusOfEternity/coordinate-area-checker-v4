package repositories

import entities.RefreshTokenEntity
import jakarta.ejb.Stateless
import jakarta.persistence.EntityManager
import jakarta.persistence.PersistenceContext

@Stateless
class RefreshTokenRepository {
    @PersistenceContext
    lateinit var em: EntityManager

    fun create(token: RefreshTokenEntity): RefreshTokenEntity {
        em.persist(token)
        em.flush()
        return token
    }

    fun getByJti(jti: String): RefreshTokenEntity? =
        em.createQuery("SELECT t FROM RefreshTokenEntity t WHERE t.jti = :jti",
            RefreshTokenEntity::class.java
        )
            .setParameter("jti", jti)
            .resultList
            .firstOrNull()

    fun deleteByJti(jti: String) =
        em.createQuery("DELETE FROM RefreshTokenEntity t WHERE t.jti = :jti")
            .setParameter("jti", jti)
            .executeUpdate()
}