import { Elysia, t } from "elysia"
import { db } from "../db/connection"
import { users } from "../db/schema/userTable"
import { signupSchema, loginSchema } from "../schemas/auth"
import { hashPassword, verifyPassword } from "../utils/password"
import { jwtConfig, type JWTPayload } from "../utils/jwt"
import { eq } from "drizzle-orm"

export const authRoutes = new Elysia({ prefix: "/auth" })
  .use(jwtConfig)
  .post(
    "/signup",
    async ({ body, jwt, set }) => {
      try {
        // Validate input
        const validatedData = signupSchema.parse(body)

        // Check if user already exists
        const existingUser = await db.select().from(users).where(eq(users.email, validatedData.email)).limit(1)

        if (existingUser.length > 0) {
          set.status = 409
          return {
            success: false,
            message: "User with this email already exists",
          }
        }

        // Hash password
        const hashedPassword = await hashPassword(validatedData.password)

        // Create user
        const newUser = await db
          .insert(users)
          .values({
            email: validatedData.email,
            password: hashedPassword,
            firstName: validatedData.firstName,
            lastName: validatedData.lastName,
          })
          .returning({
            id: users.id,
            email: users.email,
            firstName: users.firstName,
            lastName: users.lastName,
            createdAt: users.createdAt,
          })

        // Generate JWT token
        const payload: JWTPayload = {
          userId: newUser[0].id,
          email: newUser[0].email,
        }

        const token = await jwt.sign(payload as any)

        set.status = 201
        return {
          success: true,
          message: "User created successfully",
          data: {
            user: newUser[0],
            token,
          },
        }
      } catch (error: any) {
        set.status = 400
        return {
          success: false,
          message: error.message || "Signup failed",
          errors: error.errors || null,
        }
      }
    },
    {
      body: t.Object({
        email: t.String(),
        password: t.String(),
        firstName: t.Optional(t.String()),
        lastName: t.Optional(t.String()),
      }),
    },
  )

  .post(
    "/login",
    async ({ body, jwt, set }) => {
      try {
        // Validate input
        const validatedData = loginSchema.parse(body)

        // Find user by email
        const user = await db.select().from(users).where(eq(users.email, validatedData.email)).limit(1)

        if (user.length === 0) {
          set.status = 401
          return {
            success: false,
            message: "Invalid email or password",
          }
        }

        // Verify password
        const isValidPassword = await verifyPassword(validatedData.password, user[0].password)

        if (!isValidPassword) {
          set.status = 401
          return {
            success: false,
            message: "Invalid email or password",
          }
        }

        // Generate JWT token
        const payload: JWTPayload = {
          userId: user[0].id,
          email: user[0].email,
        }

        const token = await jwt.sign(payload as any)

        return {
          success: true,
          message: "Login successful",
          data: {
            user: {
              id: user[0].id,
              email: user[0].email,
              firstName: user[0].firstName,
              lastName: user[0].lastName,
            },
            token,
          },
        }
      } catch (error: any) {
        set.status = 400
        return {
          success: false,
          message: error.message || "Login failed",
          errors: error.errors || null,
        }
      }
    },
    {
      body: t.Object({
        email: t.String(),
        password: t.String(),
      }),
    },
  )

  .get("/me", async ({ jwt, headers, set }) => {
    try {
      const authHeader = headers.authorization

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        set.status = 401
        return {
          success: false,
          message: "Authorization token required",
        }
      }

      const token = authHeader.substring(7)
      const verified = await jwt.verify(token)

      if (!verified || typeof verified !== "object" || !("userId" in verified) || !("email" in verified)) {
        set.status = 401
        return {
          success: false,
          message: "Invalid or expired token",
        }
      }

      const payload = verified as unknown as JWTPayload

      // Get user data
      const user = await db
        .select({
          id: users.id,
          email: users.email,
          firstName: users.firstName,
          lastName: users.lastName,
          isVerified: users.isVerified,
          createdAt: users.createdAt,
        })
        .from(users)
        .where(eq(users.id, payload.userId))
        .limit(1)

      if (user.length === 0) {
        set.status = 404
        return {
          success: false,
          message: "User not found",
        }
      }

      return {
        success: true,
        data: {
          user: user[0],
        },
      }
    } catch (error: any) {
      set.status = 401
      return {
        success: false,
        message: "Invalid token",
      }
    }
  })
