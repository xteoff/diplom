// app/api/auth/logout/route.ts
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST() {
  try {
    // Создаём ответ
    const response = NextResponse.json(
      { success: true, message: 'Выход выполнен успешно' },
      { status: 200 }
    )
    
    // Удаляем куки
    response.cookies.set({
      name: 'token',
      value: '',
      maxAge: -1, // Немедленное удаление
      path: '/',
    })
    
    return response
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Ошибка сервера при выходе' },
      { status: 500 }
    )
  }
}

// Для всех остальных методов
export async function GET() {
  return NextResponse.json(
    { success: false, message: 'Метод не разрешён. Используйте POST.' },
    { status: 405, headers: { 'Allow': 'POST' } }
  )
}