import prisma from '../../lib/prisma'
import Link from 'next/link'
import OrderStatusButtons from './OrderStatusButtons'

export default async function AdminOrders() {
  const orders = await prisma.order.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  })

  return (
    <div className='flex flex-col gap-6'>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-center text-black">
          Заказы
        </h1>
        <Link href="/dashboard" className="ml-auto block cursor-pointer">
          <img src="/close.svg" width={32} height={32} alt="Close" />
        </Link>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Пользователь
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Адрес
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Статус
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {order.userID || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.adress}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <OrderStatusButtons orderId={order.id} status={order.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
