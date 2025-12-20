package exceptions

import jakarta.ws.rs.core.Response

class UserNotFoundException(param: String): BaseBusinessException(
    Response.Status.NOT_FOUND,
    "User with $param not found"
)