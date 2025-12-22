package filters

import exceptions.InvalidTokenException
import exceptions.NoTokenProvidedException
import jakarta.ws.rs.container.ContainerRequestContext
import jakarta.ws.rs.container.ContainerRequestFilter
import services.JWTService

class EndpointAuthFilter(
    private val jwtService: JWTService
) : ContainerRequestFilter {

    override fun filter(requestContext: ContainerRequestContext) {
        val authHeader = requestContext.getHeaderString("Authorization")
            ?: throw NoTokenProvidedException()

        val token = authHeader.removePrefix("Bearer ").trim()

        jwtService.verifyToken(token) ?: throw InvalidTokenException()

        requestContext.setProperty("authToken", token)
    }
}
