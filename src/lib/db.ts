/**
 * Manages a singleton instance of PrismaClient for database operations.
 * This file exports a PrismaClient instance named `prisma`.
 * When the application is running in production mode, a new PrismaClient instance is created.
 * In non-production environments, it checks if a global variable `cachedPrisma` exists.
 * If `cachedPrisma` does not exist, a new PrismaClient instance is created and assigned to `cachedPrisma`.
 * Subsequent requests for `prisma` will reuse the existing `cachedPrisma` instance to save resources.
 */

// Import the PrismaClient class from the Prisma client package.
import { PrismaClient } from "@prisma/client";

// Import the "server-only" module. Assuming this module contains server-specific configurations or utilities.
import "server-only";

// Declare a global variable `cachedPrisma` to store the PrismaClient instance.
declare global {
  var cachedPrisma: PrismaClient;
}

// Singleton design pattern:-
// Export the variable for use throughout the application.
export let prisma: PrismaClient;

// Check the environment to determine whether to create a new PrismaClient instance or reuse an existing one.
if (process.env.NODE_ENV === "production") {
  // Create a new PrismaClient instance if running in a production environment.
  prisma = new PrismaClient();
} else {
  // Create a new PrismaClient instance and assign it to `cachedPrisma` if `cachedPrisma` does not exist.
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient();
  }
  // Reuse the existing `cachedPrisma` instance.
  prisma = global.cachedPrisma;
}
