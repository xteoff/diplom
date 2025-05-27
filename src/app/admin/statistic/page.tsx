import prisma from '../../lib/prisma'

export default async function AdminDashboard() {
  const userCount = await prisma.user.count()
//   const postCount = await prisma.post.count()
//   const publishedPostCount = await prisma.post.count({
//     where: { published: true },
//   })

  return (
    <div>
      <div className="text-center">
        <h1 className="text-2xl font-bold text-[rgb(135,61,61)]">
          Панель администратора
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Кол-во пользователей" value={userCount} icon="👥" />
        {/* <StatCard title="Total Posts" value={postCount} icon="📝" />
        <StatCard
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