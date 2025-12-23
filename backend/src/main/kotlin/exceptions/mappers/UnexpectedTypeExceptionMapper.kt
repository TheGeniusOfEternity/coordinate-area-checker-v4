package exceptions.mappers

import dto.common.CommonResponseDTO
import jakarta.validation.UnexpectedTypeException
import jakarta.ws.rs.core.Response
import jakarta.ws.rs.ext.ExceptionMapper
import jakarta.ws.rs.ext.Provider

@Provider
class UnexpectedTypeExceptionMapper : ExceptionMapper<UnexpectedTypeException> {
    override fun toResponse(exception: UnexpectedTypeException): Response {
        return Response.status(Response.Status.BAD_REQUEST)
            .entity(
                CommonResponseDTO(
                    Response.Status.BAD_REQUEST.statusCode,
                    "Validation error: ${exception.message}",
                )
            )
            .build()
    }
}