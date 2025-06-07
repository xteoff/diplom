import prisma from '../../../lib/prisma'
import { NextResponse } from 'next/server'
import { generateInvoiceNumber } from '../../../lib/invoiceUtils'

export async function POST(request: Request) {
  try {
    const { orderId } = await request.json()
    
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { 
        orderItems: { include: { product: true } },
        user: true 
      }
    })

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      )
    }

    const totalAmount = order.orderItems.reduce(
      (sum, item) => sum + (item.quantity * item.price), 
      0
    )

    const invoice = await prisma.invoice.create({
      data: {
        invoiceNumber: generateInvoiceNumber(),
        date: new Date(),
        totalAmount,
        customerName: order.user?.name || '',
        customerAddress: order.adress || '',
        items: order.orderItems.map(item => ({
          name: item.product.name,
          quantity: item.quantity,
          price: item.price,
          amount: item.quantity * item.price
        })),
        order: { connect: { id: orderId } },
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })

    return NextResponse.json(invoice)
  } catch (error) {
    console.error('Failed to generate invoice:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}