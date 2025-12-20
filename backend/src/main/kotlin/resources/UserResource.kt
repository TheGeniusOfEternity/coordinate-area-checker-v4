package resources

import annotations.AuthRequired
import dto.common.CommonResponseDTO
import jakarta.inject.Inject
import jakarta.ws.rs.GET
import jakarta.ws.rs.Path
import jakarta.ws.rs.PathParam
import jakarta.ws.rs.Produces
import jakarta.ws.rs.core.MediaType
import jakarta.ws.rs.core.Response
import services.UserService

@Produces(MediaType.APPLICATION_JSON)
@Path("/user")
class UserResource {
    @Inject
    private lateinit var userService: UserService

    @GET
    @Path("{id}")
    @AuthRequired
    fun getById(@PathParam("id") id: String): Response {
        val result = userService.getById(id.toLong())
        return Response.ok(CommonResponseDTO(
            200,
            result
        )).build()
    }
}