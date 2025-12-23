package exceptions

import jakarta.ws.rs.core.Response

class InvalidTokenException : BaseBusinessException(
    status = Response.Status.UNAUTHORIZED,
    message = "Invalid token"
)