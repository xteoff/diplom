import prisma from './prisma'
import { logError } from './error-handler'

export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    await prisma.$queryRaw`SELECT 1`
    return true
  } catch (error) {
    logError(error, 'Database connection check')
    return false
  }
}

export async function disconnectDatabase(): Promise<void> {
  try {
    await prisma.$disconnect()
  } catch (error) {
    logError(error, 'Database disconnect')
  }
}

export async function withDatabaseConnection<T>(
  operation: () => Promise<T>
): Promise<T> {
  try {
    const isConnected = await checkDatabaseConnection()
    if (!isConnected) {
      throw new Error('Database connection failed')
    }
    
    return await operation()
  } catch (error) {
    logError(error, 'Database operation')
    throw error
  }
}

// Graceful shutdown handler
process.on('beforeExit', async () => {
  await disconnectDatabase()
})

process.on('SIGINT', async () => {
  await disconnectDatabase()
  process.exit(0)
})

process.on('SIGTERM', async () => {
  await disconnectDatabase()
  process.exit(0)
})
