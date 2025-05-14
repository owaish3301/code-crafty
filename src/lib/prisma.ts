// src/lib/prisma.ts
import { PrismaClient } from '@prisma/client';

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
// Learn more: https://pris.ly/d/help/next-js-best-practices

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Function to initialize Prisma with retries
function initPrisma() {
  try {
    const client = new PrismaClient();
    // Test the connection
    client.$connect();
    return client;
  } catch (error) {
    console.error('Failed to initialize Prisma client:', error);
    throw error;
  }
}

export const prisma = globalForPrisma.prisma || initPrisma();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
