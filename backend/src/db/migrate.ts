import { migrate } from "drizzle-orm/postgres-js/migrator"
import { db, client } from "./connection"

export async function runMigrations() {
  try {
    console.log("Running migrations...")
    await migrate(db, { migrationsFolder: "./drizzle" })
    console.log("Migrations completed successfully!")
  } catch (error) {
    console.error("Migration failed:", error)
    throw error
  }
}

export async function closeDatabaseConnection() {
  await client.end()
}

if (import.meta.main) {
  runMigrations()
    .then(() => {
      console.log("Migration script completed")
      process.exit(0)
    })
    .catch((error) => {
      console.error("Migration script failed:", error)
      process.exit(1)
    })
    .finally(() => {
      closeDatabaseConnection()
    })
}
