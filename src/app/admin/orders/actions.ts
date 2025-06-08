'use server'
import prisma from '../../lib/prisma'

export async function updateOrderStatus(orderId: string, status: number) {
  try {
    const updatedOrder = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        status: status,
      },
    })
    
    return updatedOrder
  } catch (error) {
    console.error('Ошибка при обновлении статуса заказа:', error)
    throw new Error('Не удалось обновить статус заказа')
  }
}
