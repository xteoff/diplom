import { NextRequest } from "next/server";
import prisma from "../../../../lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  if (!id) {
    return new Response(
      JSON.stringify({ message: "Error while searching orders" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const result = await prisma.order.findMany({
    where: {
      userID: id,
    },
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
    return new Response(JSON.stringify({ message: "Orders not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify(result), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
