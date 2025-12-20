package annotations

import kotlin.annotation.Retention

@Retention(AnnotationRetention.RUNTIME)
@Target(AnnotationTarget.FUNCTION)
annotation class AuthRequired