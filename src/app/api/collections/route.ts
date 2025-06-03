import { NextResponse } from 'next/server'
import prisma from '../../lib/prisma'

export async function GET(request: Request) {
  const result = await prisma.collection.findMany({
    select: {
      id: true,
      name: true,
      products: true,
    },
  });

  if (!result) {
    return new Response(JSON.stringify([]), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify(result), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData.entries());

  const result = await prisma.collection.create({
    data: {
      name: data.name.toString(),
    },
  });

  if (!result) {
    return new Response(
      JSON.stringify({ message: "Error while creating product" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
  return new Response(JSON.stringify(result), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
