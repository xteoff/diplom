'use server'
import prisma from '../lib/prisma'

export async function generateInvoice(orderId: string) {
  // Check if invoice already exists
  const existingInvoice = await prisma.invoice.findUnique({
    where: { orderId }
  })

  if (existingInvoice) {
    return { invoiceNumber: existingInvoice.invoiceNumber }
  }

  // Get order data with items and user
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      orderItems: {
        include: {
          product: true
        }
      },
      user: true
    }
  })

  if (!order) {
    throw new Error('Order not found')
  }

  // Prepare items for invoice
  const itemsForInvoice = order.orderItems.map(item => ({
    name: item.product.name,
    quantity: item.quantity,
    price: item.price,
    amount: item.price * item.quantity // Calculate amount here for consistency
  }))

  // Calculate total amount
  const totalAmount = itemsForInvoice.reduce(
    (sum, item) => sum + item.amount, 
    0
  )

  // Generate invoice number (YYYYMMDD-XXXX format)
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')
  
  // Find last invoice for today
  const lastInvoice = await prisma.invoice.findFirst({
    orderBy: { createdAt: 'desc' },
    where: {
      invoiceNumber: {
        startsWith: `${year}${month}${day}`
      }
    }
  })
  
  let sequence = 1
  if (lastInvoice) {
    const lastSequence = parseInt(lastInvoice.invoiceNumber.split('-')[1])
    sequence = lastSequence + 1
  }
  
  const invoiceNumber = `${year}${month}${day}-${String(sequence).padStart(4, '0')}`

  // Create the invoice
  const invoice = await prisma.invoice.create({
    data: {
      orderId,
      invoiceNumber,
      date: today,
      customerName: order.user?.name || 'Не указано',
      customerAddress: order.adress || 'Не указано',
      items: itemsForInvoice,
      totalAmount
    }
  })

  return { invoiceNumber: invoice.invoiceNumber }
}