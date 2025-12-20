package processors

import annotations.AuthRequired
import filters.AuthRequiredFilter
import jakarta.inject.Inject
import jakarta.ws.rs.container.DynamicFeature
import jakarta.ws.rs.container.ResourceInfo
import jakarta.ws.rs.core.FeatureContext
import jakarta.ws.rs.ext.Provider
import services.JWTService

@Provider
class AuthRequiredProcessor : DynamicFeature {
    @Inject
    private lateinit var jwtService: JWTService

    override fun configure(resourceInfo: ResourceInfo, context: FeatureContext) {
        if (resourceInfo.resourceMethod.isAnnotationPresent(AuthRequired::class.java)) {
            context.register(AuthRequiredFilter(jwtService))
        }
    }
}
