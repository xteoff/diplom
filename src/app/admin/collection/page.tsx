import prisma from '../../lib/prisma'
import Link from 'next/link'

export default async function AdminCollections() {
  const collections = await prisma.collection.findMany({
  })

  return (
    <div className='flex flex-col gap-6'>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-center text-black">
          Коллекции
        </h1>
        <Link href="/dashboard" className="ml-auto block  cursor-pointer">
          <img src="/close.svg" width={32} height={32} alt="Close" />
        </Link>
      </div>
      <div className='flex self-end'>
        <Link
          href="/admin/collection/create"
          className="bg-[rgb(135,61,61)] border border-transparent text-white px-4 py-2 rounded-lg duration-300 hover:bg-transparent hover:border-[rgb(135,61,61)] hover:text-black transition-colors"
        >
          Добавить коллекцию
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
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {collections.map((collection) => (
              <tr key={collection.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {collection.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {collection.name || '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}