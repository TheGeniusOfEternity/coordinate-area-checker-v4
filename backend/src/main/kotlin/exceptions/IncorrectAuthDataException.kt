package exceptions

import jakarta.ws.rs.core.Response

class IncorrectAuthDataException : BaseBusinessException(
    status = Response.Status.UNAUTHORIZED,
    message = "Incorrect email or password",
)