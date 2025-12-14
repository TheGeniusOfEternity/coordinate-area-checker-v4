package exceptions

import jakarta.ws.rs.core.Response

class IncorrectPasswordException: BaseBusinessException(
    status = Response.Status.UNAUTHORIZED,
    message = "Incorrect password",
)