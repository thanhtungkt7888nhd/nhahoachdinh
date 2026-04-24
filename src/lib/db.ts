// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - Prisma 7 generated client
import { PrismaClient } from "../generated/prisma/client";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function createPrismaClient(): any {
  const databaseUrl = process.env.DATABASE_URL;

  // Production: PostgreSQL via Neon or any PG provider
  if (databaseUrl && databaseUrl.startsWith("postgres")) {
    const { Pool } = require("pg");
    const { PrismaPg } = require("@prisma/adapter-pg");
    const pool = new Pool({ connectionString: databaseUrl });
    const adapter = new PrismaPg(pool);
    return new PrismaClient({ adapter });
  }

  // Local dev: SQLite
  const { PrismaBetterSqlite3 } = require("@prisma/adapter-better-sqlite3");
  const path = require("path");
  const dbPath = path.join(process.cwd(), "prisma", "dev.db");
  const adapter = new PrismaBetterSqlite3({ url: dbPath });
  return new PrismaClient({ adapter });
}

const globalForPrisma = globalThis as unknown as {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prisma: any;
};

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
