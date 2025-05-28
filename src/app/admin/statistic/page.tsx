import Link from 'next/link'
import prisma from '../../lib/prisma'

export default async function AdminDashboard() {
  const userCount = await prisma.user.count()
  const productCount = await prisma.product.count()
//   const publishedPostCount = await prisma.post.count({
//     where: { published: true },
//   })

  return (
    <div className='flex flex-col gap-6'>
      <div className="flex flex-row ">
        <h1 className="text-2xl font-bold text-center text-black">
          Статистика
        </h1>
        <Link href="/dashboard" className="ml-auto block mb-8 cursor-pointer">
          <img src="/close.svg" width={32} height={32} alt="Close" />
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Кол-во пользователей" value={userCount} icon="👥" />
        <StatCard title="Кол-во товаров" value={productCount} icon="📝" />
        {/* <StatCard
          title="Published Posts"
          value={publishedPostCount}
          icon="✅"
        /> */}
      </div>
    </div>
  )
}

function StatCard({
  title,
  value,
  icon,
}: {
  title: string
  value: number
  icon: string
}) {
  return (
    <div className="bg-white w-full p-8 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-600">{title}</h3>
        <span className="text-2xl">{icon}</span>
      </div>
      <p className="mt-2 text-3xl font-bold">{value}</p>
    </div>
  )
}