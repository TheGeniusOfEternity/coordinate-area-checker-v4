package annotations

import jakarta.ws.rs.NameBinding
import kotlin.annotation.Retention

@NameBinding
@Retention(AnnotationRetention.RUNTIME)
annotation class BearerToken