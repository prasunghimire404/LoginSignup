import { z } from "zod"

const envSchema = z.object({
  PORT: z.string().default("3000"),
  DBURL: z.url(),
  DB_HOST: z.string(),
  DB_NAME: z.string(),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  ACCESS_TOKEN_SECRET: z.string(),
  REFRESH_TOKEN_SECRET: z.string(),
  CORS_ORIGIN: z.string().default("*"),
})

const env = envSchema.parse(process.env)

export default env
