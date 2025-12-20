package resources

import annotations.AuthRequired
import dto.common.CommonResponseDTO
import jakarta.inject.Inject
import jakarta.ws.rs.GET
import jakarta.ws.rs.Path
import jakarta.ws.rs.Produces
import jakarta.ws.rs.core.MediaType
import jakarta.ws.rs.core.Response
import services.ShotService

@AuthRequired
@Produces(MediaType.APPLICATION_JSON)
@Path("/shots")
class ShotResource {
    @Inject
    private lateinit var shotsService: ShotService

    @GET
    @Path("/")
    fun getAll(): Response {
        val result = shotsService.getAll()
        return Response.ok(CommonResponseDTO(
            200,
            result
        )).build()
    }
}