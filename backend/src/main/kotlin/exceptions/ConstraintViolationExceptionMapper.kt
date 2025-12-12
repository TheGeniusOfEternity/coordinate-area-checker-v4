import dto.common.CommonResponseDTO
import dto.validation.ValidationErrorResponseDTO
import jakarta.validation.ConstraintViolationException
import jakarta.ws.rs.core.Response
import jakarta.ws.rs.ext.ExceptionMapper
import jakarta.ws.rs.ext.Provider

@Provider
class ConstraintViolationExceptionMapper : ExceptionMapper<ConstraintViolationException> {
    override fun toResponse(exception: ConstraintViolationException): Response {
        val errors = exception.constraintViolations.map { violation ->
            val cleanField = violation.propertyPath
                .toString()
                .substringAfterLast('.')

            ValidationErrorResponseDTO(
                field = cleanField,
                message = violation.message
            )
        }
        return Response.status(Response.Status.BAD_REQUEST)
            .entity(CommonResponseDTO(
                Response.Status.BAD_REQUEST.statusCode,
                errors
            ))
            .build()
    }
}