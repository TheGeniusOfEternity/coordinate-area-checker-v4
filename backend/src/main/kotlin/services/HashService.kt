package services

import jakarta.enterprise.context.ApplicationScoped
import org.mindrot.jbcrypt.BCrypt


@ApplicationScoped
class HashService {

    fun hashCredentials(credentials: String,): String {
        return BCrypt.hashpw(credentials, BCrypt.gensalt())
    }

    fun verifyCredentials(credentials: String, hash: String): Boolean {
        return BCrypt.checkpw(credentials, hash)
    }
}