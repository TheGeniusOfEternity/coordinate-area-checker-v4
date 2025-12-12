package exceptions

import jakarta.ws.rs.core.Response

class UserNotFoundException(email: String): BaseBusinessException(
    Response.Status.NOT_FOUND,
    "User with email $email not found"
)