package resources

import dto.auth.AuthResponseDTO
import dto.auth.LoginRequestDTO
import dto.auth.RegisterRequestDTO
import dto.common.CommonResponseDTO
import jakarta.inject.Inject
import jakarta.validation.Valid
import jakarta.ws.rs.Consumes
import jakarta.ws.rs.CookieParam
import jakarta.ws.rs.POST
import jakarta.ws.rs.Path
import jakarta.ws.rs.Produces
import jakarta.ws.rs.core.MediaType
import jakarta.ws.rs.core.NewCookie
import jakarta.ws.rs.core.Response
import services.AuthService
import java.time.Duration

@Produces(MediaType.APPLICATION_JSON)
@Path("/auth")
class AuthResource {

    @Inject
    private lateinit var authService: AuthService

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/login")
    fun login(@Valid request: LoginRequestDTO): Response {
        val tokens = authService.login(request)
        return Response.ok(
            CommonResponseDTO(
                200,
                AuthResponseDTO(tokens.accessToken)
            )
        ).cookie(createRefreshCookie(tokens.refreshToken)).build()
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/register")
    fun register(@Valid request: RegisterRequestDTO): Response {
        val tokens = authService.register(request)
        return Response.ok(
            CommonResponseDTO(
                200,
                AuthResponseDTO(tokens.accessToken)
            )
        ).cookie(createRefreshCookie(tokens.refreshToken)).build()
    }

    @POST
    @Path("/refresh-jwt")
    fun refreshJWT(
        @CookieParam("refresh_token")
        refreshToken: String
    ): Response {
        val newAccessToken = authService.refreshAccessToken(refreshToken)
        return Response.ok(
            CommonResponseDTO(
                200,
                AuthResponseDTO(newAccessToken)
            )
        ).build()
    }

    private fun createRefreshCookie(refreshToken: String): NewCookie {
        return NewCookie.Builder("refresh_token")
            .value(refreshToken)
            .path("/")
            .comment("Secure JWT Refresh Token")
            .maxAge(Duration.ofDays(7).toSeconds().toInt())
            .secure(true)
            .httpOnly(true)
            .sameSite(NewCookie.SameSite.STRICT)
            .build()
    }
}