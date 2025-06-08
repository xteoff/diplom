import prisma from '../../lib/prisma'
import Link from 'next/link'

export default async function AdminProducts() {
  const products = await prisma.product.findMany({
    orderBy: { name: 'desc' },
  })

  return (
    <div className='flex flex-col gap-6'>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-center text-black">
          Товары
        </h1>
        <Link href="/dashboard" className="ml-auto block  cursor-pointer">
          <img src="/close.svg" width={32} height={32} alt="Close" />
        </Link>
      </div>
      <div className='flex self-end'>
        <Link
          href="/admin/products/create"
          className="bg-[rgb(135,61,61)] border border-transparent text-white px-4 py-2 rounded-lg duration-300 hover:bg-transparent hover:border-[rgb(135,61,61)] hover:text-black transition-colors"
        >
          Добавить товар
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
                Название
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Коллекция
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Цена
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ссылка на фото
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {product.name || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product.collectionID}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product.price}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product.image}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}