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
    const image = formData.get("image") as File | null;

    console.log('Received data:', { name, price, collectionID, description, image: image?.name });

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
        price: +price,
        description,
        collectionID,
      }
    });

    // Обработка изображения (если есть)
    if (image && image.size > 0) {
      const uploadDir = `${process.cwd()}/public/products`;
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const fileName = `${product.id}.webp`;
      const filePath = path.join(uploadDir, fileName);
      await writeFile(filePath, buffer);
    }

    return NextResponse.json(product, { status: 201 });

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { message: 'Ошибка при создании товара' },
      { status: 500 }
    );
  }
}