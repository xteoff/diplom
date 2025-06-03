import { NextResponse } from 'next/server'
import prisma from '../../../lib/prisma'
import fs from "fs"
import path from "path"
import { writeFile } from "fs/promises"

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    // Извлекаем данные из formData
    const name = formData.get("name")?.toString();
    const price = formData.get("price")?.toString();
    const description = formData.get("description")?.toString();
    const collectionID = formData.get("collectionID")?.toString();
    const image = formData.get("image")?.toString();

    console.log('Received data:', { name, price, collectionID, description, image});

    // Валидация
    if (!name || !price || !description || !collectionID) {
      return NextResponse.json(
        { message: 'Все поля обязательны для заполнения' },
        { status: 400 }
      );
    }

    // Создание товара
    const product = await prisma.product.create({
      data: {
        name,
        image: image?image:'',
        price: +price,
        description,
        collectionID,
      }
    });

    return NextResponse.json(product, { status: 201 });

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { message: 'Ошибка при создании товара' },
      { status: 500 }
    );
  }
}