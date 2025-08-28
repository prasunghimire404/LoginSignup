import jwt from "@elysiajs/jwt"
import env from "../config/env"

export const jwtConfig = jwt({
  name: "jwt",
  secret: env.ACCESS_TOKEN_SECRET,
  exp: "7d", // Token expires in 7 days
})

export const refreshJwtConfig = jwt({
  name: "refreshJwt",
  secret: env.REFRESH_TOKEN_SECRET,
  exp: "30d", // Refresh token expires in 30 days
})

export interface JWTPayload {
  userId: number
  email: string
  iat?: number
  exp?: number
  [key: string]: any // Added index signature to satisfy ClaimType requirements
}
