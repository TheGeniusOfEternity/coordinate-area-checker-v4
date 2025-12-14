package converters

import annotations.BearerToken
import jakarta.ws.rs.ext.ParamConverter
import jakarta.ws.rs.ext.ParamConverterProvider
import jakarta.ws.rs.ext.Provider
import java.lang.reflect.Type

@Provider
class BearerTokenConverterProvider : ParamConverterProvider {
    override fun <T> getConverter(
        rawType: Class<T>,
        genericType: Type,
        annotations: Array<out Annotation>
    ): ParamConverter<T>? {
        if (annotations.none { it is BearerToken } || rawType != String::class.java) {
            return null
        }

        return object : ParamConverter<T> {
            override fun fromString(value: String?): T {
                if (value.isNullOrBlank()) {
                    throw IllegalArgumentException("Authorization header is required")
                }
                val token = value.removePrefix("Bearer ").trim()
                if (token.isBlank()) {
                    throw IllegalArgumentException("Invalid token format")
                }
                @Suppress("UNCHECKED_CAST")
                return token as T
            }

            override fun toString(value: T): String = value?.toString() ?: ""
        }
    }
}
