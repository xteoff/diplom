'use client'

import { useAuth } from '@/hooks/useAuth'
import { SessionProvider, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { redirect, useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function DashboardWrapper(){
  return (
    <SessionProvider>
      <Dashboard/>
    </SessionProvider>
  )
}

function Dashboard() {
  const router = useRouter()
  const session = useSession()

  const onLogOutHandler = async () => {
    await signOut({redirect: false});
    router.push("/login");
    router.refresh();
  };

  if (session.status == "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        <span className="sr-only">Загрузка...</span>
      </div>
    )
  }

  if (!session.data) {
    return (
      // <div className="min-h-screen flex items-center justify-center">
      //   <div className="text-red-500 text-lg">Ошибка загрузки</div>
      // </div>
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        <span className="sr-only">Загрузка...</span>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-indigo-600">Личный кабинет</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-gray-600">{session.data.user?.email}</span>

              {session.data.user && session.data.user.role === "ADMIN" ? (
                <Link 
                  href="/admin/statistic"
                  className="text-indigo-600 hover:text-indigo-500 transition-colors cursor-pointer"
                >
                  Панель админа
                </Link>
              ) : <></>}

              {/* <button onClick={handleAdmin}  className="text-indigo-600 hover:text-indigo-500 transition-colors cursor-pointer"
                >Панель админа
              </button> */}
              
              <button onClick={onLogOutHandler} className="text-indigo-600 hover:text-indigo-500 transition-colors cursor-pointer"
                >Выйти
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex flex-col items-center justify-center gap-4">
            <h2 className="text-2xl font-semibold text-gray-700">
              Добро пожаловать, {session.data.user.name || session.data.user.email}!
            </h2>
            <p className="text-gray-500">Ваш ID: {session.data.user.id}</p>
            <p className="text-gray-500">Ваша роль: {session.data.user.role}</p>
          </div>
        </div>
      </main>
    </div>
  )
}