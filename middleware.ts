import { NextResponse, NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

// Получаем JWT_SECRET с проверкой
function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET
  if (!secret) {
    throw new Error('JWT_SECRET is not defined in environment variables')
  }
  return secret
}

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const isAdminPath = path.startsWith('/admin')
  const isAuthPath = path.startsWith('/auth')

  try {
    const JWT_SECRET = getJwtSecret()
    const allCookies = cookies()
    const tokenCookie = (await allCookies).get('token')
    const token = tokenCookie?.value

    let isAuthenticated = false
    let isAdmin = false
    let userId: string | null = null

    if (token) {
      try {
        const decoded = jwt.verify(token, JWT_SECRET) as { 
          userId: string 
          role: string
          exp: number
        }

        if (decoded.exp * 1000 > Date.now()) {
          isAuthenticated = true
          isAdmin = decoded.role === 'admin'
          userId = decoded.userId
        }
      } catch (error) {
        console.error('Token verification failed:', error)
        // При ошибке верификации очищаем куки
        const response = NextResponse.redirect(new URL('/auth/login', request.url))
        response.cookies.delete('token')
        return response
      }
    }

    // Редиректы для административных путей
    if (isAdminPath) {
      if (!isAuthenticated) {
        return NextResponse.redirect(
          new URL(`/auth/login?callback=${encodeURIComponent(path)}`, request.url)
        )
      }
      
      if (!isAdmin) {
        return NextResponse.redirect(new URL('/403', request.url))
      }
    }

    // Редирект если авторизованный пользователь на странице входа
    if (isAuthPath && isAuthenticated && !path.includes('/logout')) {
      return NextResponse.redirect(new URL('/', request.url))
    }

    // Продолжаем выполнение с добавлением заголовков
    const response = NextResponse.next()
    
    if (userId) {
      response.headers.set('x-user-id', userId)
      response.headers.set('x-user-role', isAdmin ? 'admin' : 'user')
    }

    return response

  } catch (error) {
    console.error('Middleware error:', error)
    return NextResponse.redirect(new URL('/500', request.url))
  }
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/auth/:path*',
    '/profile/:path*',
    '/dashboard/:path*'
  ]
}