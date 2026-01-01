import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import pkg from "pg"
import { signupSchema } from "./schema/users.js"

const { Pool } = pkg

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

export const prisma = new PrismaClient({
  adapter: new PrismaPg(pool),
})
