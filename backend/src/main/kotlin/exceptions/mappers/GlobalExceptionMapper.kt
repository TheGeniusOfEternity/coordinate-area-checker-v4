package exceptions.mappers

import dto.common.CommonResponseDTO
import exceptions.BaseBusinessException
import jakarta.ws.rs.core.Response
import jakarta.ws.rs.ext.ExceptionMapper
import jakarta.ws.rs.ext.Provider

@Provider
class GlobalExceptionMapper : ExceptionMapper<Throwable> {
    override fun toResponse(exception: Throwable): Response {
        println("Exception caught in Global: ${exception.javaClass.name}")
        println(exception.message)
        return when (exception) {
            is BaseBusinessException -> Response.status(exception.status)
                .entity(
                    CommonResponseDTO(
                        exception.status.statusCode,
                        exception.message
                    )
                )
                .build()

            else -> Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                .entity(
                    CommonResponseDTO(
                        Response.Status.INTERNAL_SERVER_ERROR.statusCode,
                        Response.Status.INTERNAL_SERVER_ERROR.reasonPhrase
                    )
                )
                .build()
        }
    }
}