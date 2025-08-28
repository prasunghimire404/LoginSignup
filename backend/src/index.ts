import { Elysia } from "elysia"
import { cors } from "@elysiajs/cors"
import { authRoutes } from "./routes/auth"
import { runMigrations } from "./db/migrate"
import env from "./config/env"

async function startServer() {
  try {
    console.log("Starting server...")

    // Run database migrations
    await runMigrations()

    const app = new Elysia()
      .use(
        cors({
          origin: env.CORS_ORIGIN === "*" ? true : env.CORS_ORIGIN,
          methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
          allowedHeaders: ["Content-Type", "Authorization"],
        }),
      )
      .get("/", () => ({
        message: "Authentication API Server",
        version: "1.0.0",
        endpoints: {
          "POST /auth/signup": "Create new user account",
          "POST /auth/login": "Login user",
          "GET /auth/me": "Get current user profile",
        },
      }))
      .use(authRoutes)
      .listen(Number(env.PORT))

    console.log(`🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`)
  } catch (error) {
    console.error("Failed to start server:", error)
    process.exit(1)
  }
}

startServer()
