import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../generated/prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const createPrismaClient = () => {
  const adapter = new PrismaMariaDb({
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT || "3306"),
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    connectionLimit: 10,
    connectTimeout: 10000,
    acquireTimeout: 10000,
  });

  return new PrismaClient({
    adapter,
    log: ["query", "error", "warn"], // 👈 ใส่ Log ไว้ดูใน Terminal ว่ามันส่งคำสั่งอะไรไปแล้วพัง
  });
};
const prisma = globalForPrisma.prisma || createPrismaClient();

export { prisma };

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
