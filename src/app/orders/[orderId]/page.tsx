import { type Invoice } from '../components/InvoiceDocument'
import prisma from '../../lib/prisma'
import { generateInvoice } from '../../actions/generateInvoice'
import { Prisma } from '@/generated/prisma'
import DownloadInvoiceWrapper from '../../../components/client/DownloadInvoiceWrapper'
import { validate as isUUID } from 'uuid'
import { getOrder } from "../actions"
import { useRouter } from "next/navigation";

export async function generateStaticParams() {
  return []
}

interface OrderItemWithProduct extends Prisma.OrderItemGetPayload<{
  include: { product: true }
}> {}

interface OrderWithRelations extends Prisma.OrderGetPayload<{
  include: {
    user: true,
    orderItems: {
      include: {
        product: true
      }
    },
    invoice: true
  }
}> {}

interface InvoiceWithOrder extends Prisma.InvoiceGetPayload<{
  include: {
    order: {
      include: {
        user: true,
        orderItems: {
          include: {
            product: true
          }
        }
      }
    }
  }
}> {}

function transformInvoice(
  invoice: Prisma.InvoiceGetPayload<{}>,
  orderItems: OrderItemWithProduct[],
  customerName: string,
  customerAddress: string
): Invoice {
  return {
    ...invoice,
    items: orderItems.map(item => ({
      name: item.product.name,
      quantity: item.quantity,
      price: item.price,
      amount: item.quantity * item.price
    })),
    customerName,
    customerAddress,
    date: invoice.date.toISOString(),
    createdAt: invoice.createdAt.toISOString(),
    updatedAt: invoice.updatedAt.toISOString()
  }
}

function transformOrder(order: OrderWithRelations) {
  return {
    ...order,
    address: order.adress // Map adress to address for type compatibility
  }
}

function getStatusText(status: number): string {
  switch(status) {
    case 0: return "Новый заказ"
    case 1: return "Заказ в доставке"
    case 2: return "Заказ доставлен"
    default: return "Неизвестный статус"
  }
}

interface OrderPageParams {
  orderId: string
}

interface OrderPageProps {
  params: Promise<OrderPageParams>
}

export default async function OrderPage({ params }: OrderPageProps) {
  const router = useRouter();
  const { orderId } = await params

  // Валидация UUID
  if (!isUUID(orderId)) {
    return <div className="container mx-auto p-4">Неверный ID заказа</div>
  }

  // Получаем данные заказа
  const order = await getOrder(orderId)

  if (!order) {
    return <div className="container mx-auto p-4">Заказ не найден</div>
  }

  // Проверяем и создаем накладную при необходимости
  let invoice = order.invoice
  if (!invoice) {
    try {
      await generateInvoice(order.id)
      const updatedOrder = await getOrder(order.id)
      invoice = updatedOrder?.invoice ?? null
    } catch (error) {
      console.error('Ошибка при создании накладной:', error)
      return (
        <div className="container mx-auto p-4">
          Ошибка при создании накладной
        </div>
      )
    }
  }

  // Вычисляем общую сумму
  const totalAmount = order.orderItems.reduce(
    (sum: number, item: OrderItemWithProduct) => sum + (item.quantity * item.price),
    0
  )

  // Форматируем дату
  const formatDate = (date: Date): string =>
    new Date(date).toLocaleDateString('ru-RU')

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">Заказ #{order.id.slice(0, 8)}</h1>

      {/* Секция с деталями заказа */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Детали заказа</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p><span className="font-medium">Статус:</span> {getStatusText(order.status)}</p>
            <p><span className="font-medium">Сумма:</span> {totalAmount.toFixed(2)} руб.</p>
            <p><span className="font-medium">Дата:</span> {formatDate(order.createdAt)}</p>
          </div>
          <div className="space-y-2">
            <p><span className="font-medium">Клиент:</span> {order.user?.name || 'Не указано'}</p>
            <p><span className="font-medium">Адрес:</span> {order.adress || 'Не указано'}</p>
          </div>
        </div>

        {/* Список товаров */}
        <h3 className="text-lg font-semibold mt-6 mb-2">Товары:</h3>
        <ul className="space-y-2">
          {order.orderItems.map((item: OrderItemWithProduct) => (
            <li key={item.id} className="flex justify-between">
              <span>{item.product.name}</span>
              <span>
                {item.quantity} шт. × {item.price.toFixed(2)} руб.
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Секция с накладной */}
      {invoice && (
        <section className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Товарная накладная</h2>
            <DownloadInvoiceWrapper 
              invoice={transformInvoice(
                invoice, 
                order.orderItems, 
                order.user?.name || '', 
                order.adress || ''
              )}
              order={transformOrder(order)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p><span className="font-medium">Номер накладной:</span> {invoice.invoiceNumber}</p>
            <p><span className="font-medium">Дата накладной:</span> {formatDate(invoice.date)}</p>
          </div>
        </section>
      )}
    </div>
  )
}