package exceptions

import jakarta.ws.rs.core.Response

class NoTokenProvidedException: BaseBusinessException(
    status = Response.Status.UNAUTHORIZED,
    message = "No token provided"
)