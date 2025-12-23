package repositories

import entities.ShotEntity
import jakarta.ejb.Stateless
import jakarta.persistence.EntityManager
import jakarta.persistence.PersistenceContext

@Stateless
class ShotRepository {
    @PersistenceContext
    private lateinit var em: EntityManager

    fun getAll(): List<ShotEntity> =
        em.createQuery(
            "SELECT s FROM ShotEntity s",
            ShotEntity::class.java
        ).resultList

    fun create(shot: ShotEntity): ShotEntity {
        em.persist(shot)
        em.flush()
        return shot
    }

    fun deleteAll(): Int {
        val query = em.createQuery("DELETE FROM ShotEntity")
        return query.executeUpdate()
    }
}