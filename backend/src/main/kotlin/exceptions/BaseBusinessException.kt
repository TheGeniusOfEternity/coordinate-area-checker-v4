package exceptions

import jakarta.ws.rs.core.Response

open class BaseBusinessException(
    val status: Response.Status,
    override val message: String,
) : RuntimeException(message)