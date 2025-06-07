import { type Invoice } from '../components/InvoiceDocument'
import { generateInvoice } from '../../actions/generateInvoice'
import { Prisma } from '@prisma/client'
import DownloadInvoiceWrapper from '../../../components/client/DownloadInvoiceWrapper'
import { validate as isUUID } from 'uuid'
import { getOrder } from "../actions"

export const dynamic = 'force-dynamic'

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

interface InvoicePayload {
  id: string
  invoiceNumber: string
  date: Date | string
  createdAt: Date | string
  updatedAt: Date | string
  orderId: string
}

function transformInvoice(
  invoice: InvoicePayload,
  orderItems: OrderItemWithProduct[],
  customerName: string,
  customerAddress: string
): Invoice {
  const items = orderItems.map(item => ({
    name: item.product.name,
    quantity: item.quantity,
    price: item.price,
    amount: item.quantity * item.price
  }));

  // Вычисляем общую сумму
  const totalAmount = items.reduce((sum, item) => sum + item.amount, 0);

  return {
    ...invoice,
    items,
    totalAmount, // Добавляем вычисленную общую сумму
    customerName,
    customerAddress,
    date: typeof invoice.date === 'string' ? invoice.date : invoice.date.toISOString(),
    createdAt: typeof invoice.createdAt === 'string' ? invoice.createdAt : invoice.createdAt.toISOString(),
    updatedAt: typeof invoice.updatedAt === 'string' ? invoice.updatedAt : invoice.updatedAt.toISOString()
  };
}

function transformOrder(order: OrderWithRelations) {
  return {
    ...order,
    address: order.adress // Используем правильное поле 'adress' из типа
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

interface OrderPageProps {
  params: {
    orderId: string
  }
}

export default async function OrderPage({ params }: OrderPageProps) {
  const { orderId } = params

  try {
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

    // Вычисляем общую сумму с явной типизацией
    const totalAmount = order.orderItems.reduce(
      (sum: number, item: OrderItemWithProduct) => sum + (item.quantity * item.price),
      0
    )

    // Форматируем дату
    const formatDate = (date: Date | string): string => {
      const dateObj = typeof date === 'string' ? new Date(date) : date
      return dateObj.toLocaleDateString('ru-RU')
    }

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
  } catch (error) {
    console.error('Error in OrderPage:', error)
    return (
      <div className="container mx-auto p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h2 className="text-red-800 font-semibold">Произошла ошибка</h2>
          <p className="text-red-600">Не удалось загрузить страницу заказа. Попробуйте обновить страницу.</p>
        </div>
      </div>
    )
  }
}