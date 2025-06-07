import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';
import { validate as isUUID } from 'uuid';

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { orderId: string } }
) {
  try {
    const { orderId } = params;

    // Validate orderId
    if (!orderId || !isUUID(orderId)) {
      return NextResponse.json(
        { error: 'Invalid order ID format' },
        { status: 400 }
      );
    }

    // Fetch order with all relations
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          }
        },
        orderItems: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                price: true,
                description: true,
              }
            }
          }
        },
        invoice: true
      }
    });

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    // Transform the order data to ensure proper types
    const transformedOrder = {
      ...order,
      createdAt: order.createdAt.toISOString(),
      updatedAt: order.updatedAt.toISOString(),
      orderItems: order.orderItems.map(item => ({
        ...item,
        price: Number(item.price),
        quantity: Number(item.quantity),
        product: {
          ...item.product,
          price: Number(item.product.price),
        }
      })),
      invoice: order.invoice ? {
        ...order.invoice,
        date: order.invoice.date.toISOString(),
        createdAt: order.invoice.createdAt.toISOString(),
        updatedAt: order.invoice.updatedAt.toISOString(),
      } : null
    };

    return NextResponse.json(transformedOrder);

  } catch (error) {
    console.error('Error fetching order:', error);
        
    // Handle specific Prisma errors
    if (error instanceof Error) {
      if (error.message.includes('connection')) {
        return NextResponse.json(
          { error: 'Database connection error' },
          { status: 503 }
        );
      }
          
      if (error.message.includes('timeout')) {
        return NextResponse.json(
          { error: 'Request timeout' },
          { status: 504 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}