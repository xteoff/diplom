import { type NextRequest } from 'next/server'
import prisma from '../../../lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { orderId: string } }
) {
  try {
    const order = await prisma.order.findUnique({
      where: { id: params.orderId },
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
      return new Response(
        JSON.stringify({ error: 'Order not found' }),
        { status: 404 }
      )
    }

    return new Response(JSON.stringify(order))
  } catch (error) {
    console.error('[ORDER_API_ERROR]', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500 }
    )
  }
}