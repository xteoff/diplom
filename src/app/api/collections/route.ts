import { NextResponse } from 'next/server'
import prisma from '../../lib/prisma'

export async function GET(request: Request) {
  try {
    const collections = await prisma.collection.findMany({
      select: {
        id: true,
        name: true,
        products: true,
      },
    });

    return NextResponse.json(collections, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
    
  } catch (error) {
    console.error('Error fetching collections:', error);
    return NextResponse.json(
      { error: 'Failed to fetch collections' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData.entries());

    const result = await prisma.collection.create({
      data: {
        name: data.name.toString(),
      },
    });

    return NextResponse.json(result, {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
    
  } catch (error) {
    console.error('Error creating collection:', error);
    return NextResponse.json(
      { error: 'Error while creating collection' },
      { status: 400 }
    );
  }
}