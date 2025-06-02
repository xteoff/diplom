import { NextResponse } from 'next/server'
import prisma from '../../../lib/prisma'

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const name = formData.get("name")?.toString();
    
    console.log('Received data:', {name});

    // Валидация
    if (!name) {
      return NextResponse.json(
        { message: 'Поле обязательно для заполнения' },
        { status: 400 }
      );
    }

    const exists = await prisma.collection.findFirst({ where: { name } })
    if (exists) {
      return NextResponse.json(
        { error: 'Коллекция с таким названием уже существует' },
        { status: 409 }
      )
    }

    const collection = await prisma.collection.create({
      data: {
        name
      }
    });

    return NextResponse.json(collection, { status: 201 });

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { message: 'Ошибка при создании коллекции' },
      { status: 500 }
    );
  }
}