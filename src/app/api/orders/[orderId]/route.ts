import prisma from "../../../lib/prisma";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
    const orderId = (await params).id;
    const result = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      invoice: true,
      user: true,
      orderItems: {
        include: {
          product: true
        }
      }
    }
  })
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