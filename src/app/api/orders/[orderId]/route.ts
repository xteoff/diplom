import { type NextRequest } from 'next/server'
import prisma from '../../../lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  try {
    const { orderId } = await params

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

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    
    if (!id) {
      return new Response(
        JSON.stringify({ error: "Order ID is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      )
    }

    const { status } = body

    if (typeof status !== 'number') {
      return new Response(
        JSON.stringify({ error: "Valid status is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      )
    }

    const updatedOrder = await prisma.order.update({
      where: {
        id: id,
      },
      data: {
        status: status,
      },
    })

    return new Response(JSON.stringify(updatedOrder), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error('[ORDER_UPDATE_ERROR]', error)
    return new Response(
      JSON.stringify({ error: "Failed to update order" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    )
  }
}