package filters

import jakarta.servlet.Filter
import jakarta.servlet.FilterChain
import jakarta.servlet.ServletRequest
import jakarta.servlet.ServletResponse
import jakarta.servlet.annotation.WebFilter
import jakarta.servlet.http.HttpServletRequest

@WebFilter(urlPatterns = ["/*"])
class MappingFilter : Filter {
    override fun doFilter(request: ServletRequest, response: ServletResponse, chain: FilterChain) {
        val httpRequest = request as HttpServletRequest
        val path = httpRequest.requestURI.removePrefix("/")

        if (path.startsWith("api/")) {
            chain.doFilter(request, response)
            return
        }

        if (path.contains(".")) {
            chain.doFilter(request, response)
            return
        }

        request.getRequestDispatcher("/static/index.html").forward(request, response)
    }
}
