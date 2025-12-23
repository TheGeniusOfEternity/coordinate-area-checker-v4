package extensions

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper

val jsonMapper: ObjectMapper = jacksonObjectMapper()

fun Any.toJson(): String = jsonMapper.writeValueAsString(this)