package config

import jakarta.ws.rs.ext.ContextResolver
import jakarta.ws.rs.ext.Provider
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.databind.DeserializationFeature
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper

@Provider
class ObjectMapperContextResolver : ContextResolver<ObjectMapper> {
    private val objectMapper = jacksonObjectMapper().apply {
        configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)
    }

    override fun getContext(type: Class<*>): ObjectMapper = objectMapper
}
