package extensions

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue

val jsonMapper: ObjectMapper = jacksonObjectMapper()

fun Any.toJson(): String = jsonMapper.writeValueAsString(this)
inline fun <reified T> String.parseJson(): T = jsonMapper.readValue(this)