// hooks/useAuth.ts
import { useState, useEffect } from 'react'
import { User } from '@prisma/client'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/auth/verify')
        if (!response.ok) throw new Error('Ошибка авторизации')
        const data = await response.json()
        setUser(data.user)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Неизвестная ошибка'))
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  return { user, loading, error }
}