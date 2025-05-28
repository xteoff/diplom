import prisma from '../../lib/prisma'
import Link from 'next/link'

export default async function AdminUsers() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className='flex flex-col gap-6'>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-center text-black">
          Пользователи
        </h1>
        <Link href="/dashboard" className="ml-auto block  cursor-pointer">
          <img src="/close.svg" width={32} height={32} alt="Close" />
        </Link>
      </div>
      <div className='flex self-end'>
        <Link
          href="/admin/users/create"
          className="bg-[rgb(135,61,61)] border border-transparent text-white px-4 py-2 rounded-lg duration-300 hover:bg-transparent hover:border-[rgb(135,61,61)] hover:text-black transition-colors"
        >
          Добавить пользователя
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
                Имя
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Адрес эл. почты
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Роль
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Действия
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {user.name || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.role}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {/* <Link
                    href={`/admin/users/${user.id}`}
                    className="text-gray-700 hover:text-gray-900 hover:underline mr-3"
                  >
                    Редактировать
                  </Link> */}
                  <button className="text-red-600 cursor-pointer hover:text-red-900 hover:underline">
                    Удалить
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}