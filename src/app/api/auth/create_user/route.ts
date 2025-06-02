import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import prisma from '../../../lib/prisma'

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    // Извлекаем данные из formData
    const name = formData.get("name")?.toString();
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();

    console.log('Received data:', { name, email, password });

    // Валидация
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: 'Все поля обязательны для заполнения' },
        { status: 400 }
      );
    }

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
        name,
        email,
        password: hashedPassword,
      }
    });

    return NextResponse.json(user, { status: 201 });

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { message: 'Ошибка при создании пользователя' },
      { status: 500 }
    );
  }
}