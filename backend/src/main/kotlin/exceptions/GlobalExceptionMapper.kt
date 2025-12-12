package exceptions

import dto.common.CommonResponseDTO
import jakarta.ws.rs.core.Response
import jakarta.ws.rs.ext.ExceptionMapper
import jakarta.ws.rs.ext.Provider

@Provider
class GlobalExceptionMapper: ExceptionMapper<BaseBusinessException> {
    override fun toResponse(exception: BaseBusinessException): Response? {
        return Response.status(exception.status)
            .entity(CommonResponseDTO(
                exception.status.statusCode,
                exception.message
            ))
            .build()
    }
}