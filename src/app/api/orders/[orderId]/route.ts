import prisma from "../../../lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id: orderId } = params;
    
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
    });

    if (!result) {
      return NextResponse.json(
        { message: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error while searching for order", error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}