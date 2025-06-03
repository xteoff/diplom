import { NextResponse } from 'next/server'
import prisma from '../../../lib/prisma'
import fs from "fs"
import path from "path"
import { writeFile } from "fs/promises"

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData.entries()) as {
      name: string;
      price: string;
      description: string;
      collectionID: string;
      image: string;
    };

    const product = await prisma.product.create({
      data: {
        name: data.name.toString(),
        description: " ",
        price: +data.price,
        collectionID: data.collectionID,
        image: data.image.toString(),
      },
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