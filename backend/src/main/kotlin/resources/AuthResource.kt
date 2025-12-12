package resources

import dto.auth.LoginRequestDTO
import jakarta.inject.Inject
import jakarta.ws.rs.Consumes
import jakarta.ws.rs.POST
import jakarta.ws.rs.Path
import jakarta.ws.rs.Produces
import jakarta.ws.rs.core.MediaType
import jakarta.ws.rs.core.Response
import services.AuthService

@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Path("/auth")
class AuthResource {
    @Inject
    private lateinit var authService: AuthService

    @POST
    @Path("/login")
    fun login(request: LoginRequestDTO): Response {
        val result = authService.login(request)
        return Response.ok(result).build()
    }
}