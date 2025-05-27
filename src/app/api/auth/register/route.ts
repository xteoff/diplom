// app/api/auth/register/route.ts
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import prisma from '../../../lib/prisma'

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json()
    console.log('Registration attempt:', { email, name })

    // Валидация
    if (!email || !password) {
      console.error('Validation failed: Email or password missing')
      return NextResponse.json(
        { message: 'Email и пароль обязательны' },
        { status: 400 }
      )
    }

    // Проверка email
    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      console.error('User already exists:', email)
      return NextResponse.json(
        { message: 'Пользователь уже существует' },
        { status: 409 }
      )
    }

    // Создание пользователя
    const hashedPassword = await bcrypt.hash(password, 12)
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword
      }
    })

    console.log('User created:', user.id)
    return NextResponse.json(user, { status: 201 })

  } catch (error) {
    console.error('Full registration error:', error)
    return NextResponse.json(
      { message: 'Ошибка при регистрации. Проверьте введенные данные.' },
      { status: 500 }
    )
  }
}