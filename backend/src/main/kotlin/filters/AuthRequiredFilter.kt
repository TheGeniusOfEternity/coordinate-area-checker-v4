package filters

import exceptions.InvalidTokenException
import exceptions.NoTokenProvidedException
import jakarta.ws.rs.container.ContainerRequestContext
import jakarta.ws.rs.container.ContainerRequestFilter
import services.JWTService

class AuthRequiredFilter(
    private val jwtService: JWTService
) : ContainerRequestFilter {

    override fun filter(requestContext: ContainerRequestContext) {
        println("=== FILTER DEBUG ===")
        println("FILTER STARTED!")

        val authHeader = requestContext.getHeaderString("Authorization")
        println("Auth header: '$authHeader'")

        if (authHeader == null) {
            println("NO AUTH HEADER - THROWING")
            throw NoTokenProvidedException()
        }

        val token = authHeader.removePrefix("Bearer ").trim()
        println("Clean token: '$token'")

        val isValid = jwtService.verifyToken(token)
        println("Token valid: $isValid")

        if (isValid == null) {
            println("INVALID TOKEN - THROWING")
            throw InvalidTokenException()
        }

        println("SUCCESS - SETTING PROPERTIES")
        requestContext.setProperty("authToken", token)
        println("========================")
    }
}
