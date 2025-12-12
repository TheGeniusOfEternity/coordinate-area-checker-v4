package exceptions

import dto.common.CommonResponseDTO
import jakarta.ws.rs.core.Response
import jakarta.ws.rs.ext.ExceptionMapper
import jakarta.ws.rs.ext.Provider

@Provider
class GlobalExceptionMapper: ExceptionMapper<Throwable> {
    override fun toResponse(exception: Throwable?): Response? {
        return when (exception) {

            else ->
                Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity(CommonResponseDTO(
                        Response.Status.INTERNAL_SERVER_ERROR.statusCode,
                        exception?.message ?: "",
                    ))
                    .build()
        }
    }

}