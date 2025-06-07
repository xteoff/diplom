export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string
  ) {
    super(message)
    this.name = 'AppError'
  }
}

export function handleDatabaseError(error: unknown): AppError {
  console.error('Database error:', error)
  
  if (error instanceof Error) {
    // Prisma specific errors
    if (error.message.includes('P2025')) {
      return new AppError('Record not found', 404, 'RECORD_NOT_FOUND')
    }
    
    if (error.message.includes('P2002')) {
      return new AppError('Unique constraint violation', 409, 'DUPLICATE_RECORD')
    }
    
    if (error.message.includes('Connection')) {
      return new AppError('Database connection failed', 503, 'DB_CONNECTION_ERROR')
    }
  }
  
  return new AppError('Database operation failed', 500, 'DATABASE_ERROR')
}

export function handleApiError(error: unknown): AppError {
  console.error('API error:', error)
  
  if (error instanceof AppError) {
    return error
  }
  
  if (error instanceof Error) {
    return new AppError(error.message, 500, 'API_ERROR')
  }
  
  return new AppError('Unknown API error', 500, 'UNKNOWN_ERROR')
}

export function logError(error: unknown, context?: string) {
  const timestamp = new Date().toISOString()
  const contextInfo = context ? `[${context}]` : ''
  
  console.error(`${timestamp} ${contextInfo} Error:`, {
    message: error instanceof Error ? error.message : 'Unknown error',
    stack: error instanceof Error ? error.stack : undefined,
    context
  })
}
