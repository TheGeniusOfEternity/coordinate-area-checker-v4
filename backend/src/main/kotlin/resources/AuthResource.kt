package resources

import annotations.BearerToken
import dto.auth.LoginRequestDTO
import dto.auth.RegisterRequestDTO
import dto.common.CommonResponseDTO
import jakarta.inject.Inject
import jakarta.validation.Valid
import jakarta.ws.rs.Consumes
import jakarta.ws.rs.HeaderParam
import jakarta.ws.rs.POST
import jakarta.ws.rs.Path
import jakarta.ws.rs.Produces
import jakarta.ws.rs.core.MediaType
import jakarta.ws.rs.core.Response
import services.AuthService

@Produces(MediaType.APPLICATION_JSON)
@Path("/auth")
class AuthResource {
    @Inject
    private lateinit var authService: AuthService

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/login")
    fun login(@Valid request: LoginRequestDTO): Response {
        val result = authService.login(request)
        return Response.ok(CommonResponseDTO(
            200,
            result
        )).build()
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/register")
    fun register(@Valid request: RegisterRequestDTO): Response {
        val result = authService.register(request)
        return Response.ok(CommonResponseDTO(
            200,
            result
        )).build()
    }

    @POST
    @Path("/refresh-jwt")
    fun refreshJWT(
        @HeaderParam("Authorization")
        @BearerToken
        token: String
    ): Response {
        val result = authService.refreshJWT(token)
        return Response.ok(CommonResponseDTO(
            200,
            result
        )).build()
    }
}