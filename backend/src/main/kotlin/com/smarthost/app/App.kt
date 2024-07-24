package com.smarthost.app


import io.ktor.http.*
import io.ktor.serialization.gson.*
import io.ktor.server.application.*
import io.ktor.server.engine.embeddedServer
import io.ktor.server.cio.*
import io.ktor.server.plugins.callloging.*
import io.ktor.server.plugins.contentnegotiation.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import java.util.concurrent.atomic.AtomicLong
import io.ktor.server.plugins.cors.routing.*

fun main() {
    val port = System.getenv("PORT")?.toInt() ?: 8080
    println("Server is running on port $port")

    embeddedServer(factory = CIO, port = port, configure = {
        connectionIdleTimeoutSeconds = 60
    }, module = Application::module).start(true)
}

fun Application.module() {

    val count = AtomicLong(0)

    val frontendHostName = System.getenv("FRONTEND_HOST") ?: "localhost:3000"

    install(CORS) {
        allowHost(frontendHostName)
        allowHost("127.0.0.1:3000")
        allowHost("frontend:3000")
        allowHeader(HttpHeaders.ContentType)
    }
    install(CallLogging)
    install(ContentNegotiation) {
        gson {
            setPrettyPrinting()
        }
    }
    routing {
        get("/") {
            call.respondText("Servus, User! (${count.incrementAndGet()})")
        }
        post("/echo") {
            val post = call.receive<String>()
            call.respondText(post)
        }

    }
}