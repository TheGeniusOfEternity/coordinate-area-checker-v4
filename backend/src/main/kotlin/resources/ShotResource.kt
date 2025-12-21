package resources

import annotations.AuthRequired
import dto.common.CommonResponseDTO
import dto.shots.ShotRequestDTO
import jakarta.inject.Inject
import jakarta.validation.Valid
import jakarta.ws.rs.Consumes
import jakarta.ws.rs.GET
import jakarta.ws.rs.POST
import jakarta.ws.rs.Path
import jakarta.ws.rs.Produces
import jakarta.ws.rs.core.MediaType
import jakarta.ws.rs.core.Response
import services.ShotService
import services.ShotWebSocketService

@AuthRequired
@Produces(MediaType.APPLICATION_JSON)
@Path("/shots")
class ShotResource {
    @Inject
    private lateinit var shotsService: ShotService

    @Inject
    private lateinit var shotWebSocketService: ShotWebSocketService

    @GET
    @Path("/")
    fun getAll(): Response {
        val result = shotsService.getAll()
        return Response.ok(CommonResponseDTO(
            200,
            result
        )).build()
    }

    @POST
    @Path("/")
    @Consumes(MediaType.APPLICATION_JSON)
    fun create(@Valid request: ShotRequestDTO): Response {
        val shot = shotsService.create(request)
        shotWebSocketService.broadcastNewShot(shot)
        return Response.ok(CommonResponseDTO(
            200,
            shot
        )).build()
    }
}