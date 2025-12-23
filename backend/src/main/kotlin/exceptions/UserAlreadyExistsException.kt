package exceptions

import jakarta.ws.rs.core.Response

class UserAlreadyExistsException : BaseBusinessException(
    status = Response.Status.CONFLICT,
    message = "User already exists"
)
