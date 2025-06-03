import { NextRequest } from "next/server";
import { CartProduct } from "@/store/slices/cart";
import prisma from "../../lib/prisma";

export async function GET(request: Request) {
  const result = await prisma.order.findMany({
    select: {
      id: true,
      user: true,
      adress: true,
      status: true,
      orderItems: {
        select: {
          product: true,
          amount: true,
        },
      },
    },
  });

  if (!result) {
    return new Response(
      JSON.stringify({ message: "Error while sedarching orders" }),
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

export async function POST(request: Request) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData.entries());
  const products: CartProduct[] = JSON.parse(data.products.toString());

  const result = await prisma.order.create({
    data: {
      userID: data.userID.toString(),
      adress: data.adress.toString(),
      orderItems: {
        create: products.map((item: CartProduct) => ({
          product: {
            connect: {
              id: item.product.id,
            },
          },
          amount: item.amount,
          quantity: item.amount, // Добавляем quantity (похоже, что amount и quantity это одно и то же)
          price: item.product.price, // Добавляем цену продукта
        })),
      },
    },
  });

  if (!result) {
    return new Response(
      JSON.stringify({ message: "Error while creating order" }),
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

