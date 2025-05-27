import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import prisma from '../../../lib/prisma'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export async function GET() {
  try {
    const allCookies = cookies()
    const tokenCookie = (await allCookies).get('token')
    const token = tokenCookie?.value

    if (!token) {
      return NextResponse.json(
        { message: 'Не авторизирован' },
        { status: 401 }
      )
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; email: string }

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        name: true,
      },
    })

    if (!user) {
      return NextResponse.json(
        { message: 'Пользователь не найден' },
        { status: 401 }
      )
    }

    return NextResponse.json({ user }, { status: 200 })
  } catch (error) {
    console.error('Verify error:', error)
    return NextResponse.json(
      { message: 'Не верный токен' },
      { status: 401 }
    )
  }
}

// Для запрета других методов
export async function POST() {
  return NextResponse.json(
    { message: 'Неправильный метод запроса' },
    { status: 405 }
  )
}

export async function PUT() {
  return NextResponse.json(
    { message: 'Неправильный метод запроса' },
    { status: 405 }
  )
}

export async function DELETE() {
  return NextResponse.json(
    { message: 'Неправильный метод запроса' },
    { status: 405 }
  )
}