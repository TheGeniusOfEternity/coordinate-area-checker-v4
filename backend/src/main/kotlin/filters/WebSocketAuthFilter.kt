package filters

import jakarta.inject.Inject
import jakarta.servlet.Filter
import jakarta.servlet.FilterChain
import jakarta.servlet.ServletRequest
import jakarta.servlet.ServletResponse
import jakarta.servlet.annotation.WebFilter
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import services.JWTService
import java.net.URLDecoder

@WebFilter(urlPatterns = ["/api/ws/*"])
class WebSocketAuthFilter : Filter {
    @Inject
    lateinit var jwtService: JWTService

    override fun doFilter(request: ServletRequest, response: ServletResponse, chain: FilterChain) {
        val httpServletRequest = request as HttpServletRequest
        val httpServletResponse = response as HttpServletResponse

        val token = getTokenFromQueryParam(httpServletRequest)

        if (token != null) {
            val userId = jwtService.verifyToken(token)
            if (userId != null) {
                request.setAttribute("currentUserId", userId)
            } else httpServletResponse.sendError(401, "Invalid JWT Token")
        } else httpServletResponse.sendError(401, "No JWT Token provided")

        chain.doFilter(request, response)
    }

    private fun getTokenFromQueryParam(request: HttpServletRequest): String? {
        val queryString = request.queryString ?: return null

        return queryString
            .split("&")
            .firstNotNullOfOrNull { param ->
                val parts = param.split("=")
                URLDecoder.decode(parts[1], "UTF-8")
            }
    }
}
