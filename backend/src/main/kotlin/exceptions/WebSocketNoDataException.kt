package exceptions

import jakarta.ws.rs.core.Response

class WebSocketNoDataException : BaseBusinessException(
    status = Response.Status.BAD_REQUEST,
    message = "Required data is not provided"
)