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

tasks.named<War>("war") {
    dependsOn(":frontend:build")
    from("../frontend/dist") {
        into("static")
    }
    webXml = file("src/main/webapp/WEB-INF/web.xml")
}
