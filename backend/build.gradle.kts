import org.gradle.kotlin.dsl.register

plugins {
    kotlin("jvm") version "2.2.20"
    war
    id("org.jetbrains.kotlin.plugin.jpa") version "2.0.20"
}

dependencies {
    implementation("jakarta.platform:jakarta.jakartaee-web-api:10.0.0")
    implementation("org.hibernate.orm:hibernate-core:6.4.0.Final")
    implementation("org.postgresql:postgresql:42.7.7")
    implementation("org.jetbrains.kotlin:kotlin-reflect:2.0.20")
}

kotlin {
    jvmToolchain(21)
}

val frontendBuild by tasks.registering(Exec::class) {
    workingDir = file("../frontend")
    commandLine("/opt/homebrew/bin/npm", "run", "build")
}

fun loadEnvFile(): Map<String, String> {
    val envFile = File(rootProject.projectDir, ".env")
    val envMap = mutableMapOf<String, String>()

    if (envFile.exists()) {
        envFile.forEachLine { line ->
            if (line.isNotEmpty() && !line.startsWith("#")) {
                val parts = line.split("=", limit = 2)
                if (parts.size == 2) {
                    val key = parts[0].trim()
                    var value = parts[1].trim()
                    if (value.startsWith("\"") && value.endsWith("\"")) {
                        value = value.substring(1, value.length - 1)
                    }
                    envMap[key] = value
                }
            }
        }
    }
    return envMap
}

val env = loadEnvFile()

tasks.register<Exec>("deployScp") {
    dependsOn("war")

    val user = env["DEPLOY_USER"] ?: "s467371"
    val host = env["DEPLOY_HOST"] ?: "se.ifmo.ru"
    val port = env["DEPLOY_PORT"] ?: "2222"
    val password = env["DEPLOY_PASSWORD"] ?: ""
    val path = env["DEPLOY_PATH"] ?: "~/wildfly/standalone/deployments"
    val warFile = "${layout.buildDirectory.get()}/libs/ROOT.war"

    // Передай пароль через переменную окружения вместо флага -p
    environment("SSHPASS", password)

    commandLine(
        "/opt/homebrew/bin/sshpass", "-e", "scp",
        "-P", port,
        "-o", "StrictHostKeyChecking=no",
        warFile,
        "$user@$host:$path"
    )
}

tasks.named<War>("war") {
    archiveFileName = "ROOT.war"
    duplicatesStrategy = DuplicatesStrategy.EXCLUDE
    dependsOn(frontendBuild)
    from("../frontend/dist") {
        into("static")
    }
    webXml = file("src/main/webapp/WEB-INF/web.xml")
}
