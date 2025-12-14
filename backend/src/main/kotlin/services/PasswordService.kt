package services

import jakarta.ejb.Stateless
import jakarta.enterprise.context.ApplicationScoped
import org.mindrot.jbcrypt.BCrypt

@ApplicationScoped
class PasswordService {
    fun hashPassword(password: String): String {
        return BCrypt.hashpw(password, BCrypt.gensalt())
    }

    fun verifyPassword(password: String, hash: String): Boolean {
        return BCrypt.checkpw(password, hash)
    }
}