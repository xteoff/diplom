import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../lib/prisma'

interface Context {
  params: {
    orderId: string
  }
}

export async function GET(request: NextRequest, context: Context) {
  try {
    const { orderId } = context.params

    const order = await prisma.order.findUnique({
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

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(order)
  } catch (error) {
    console.error('[ORDER_GET_ERROR]', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}