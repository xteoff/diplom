'use client'

import { SessionProvider, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

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
    router.push("/auth/sign-in");
    router.refresh();
  };

  if (session.status == "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[rgb(135,61,61)]"></div>
        <span className="sr-only">Загрузка...</span>
      </div>
    )
  }

  if (!session.data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[rgb(135,61,61)]"></div>
        <span className="sr-only">Загрузка...</span>
      </div>
    )
  }
  
  return (
    <div className=" bg-red-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto font-Light px-5 md:px-20 lg:px-8">
          <div className="flex flex-row sm:justify-between h-16 items-center">
            <div className="flex items-center">
              <h1 className="text-xl font-light text-[rgb(135,61,61)]">
                Добро пожаловать, {session.data.user.name || session.data.user.email}!
              </h1>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-gray-600 font-light">{session.data.user?.email}</span>

              {session.data.user && session.data.user.role === "ADMIN" ? (
                <Link 
                  href="/admin/statistic"
                  className="text-[rgb(135,61,61)] font-light hover:underline transition-colors cursor-pointer"
                >
                  Панель админа
                </Link>
              ) : <></>}
              
              <button onClick={onLogOutHandler} className="text-[rgb(135,61,61)]  hover:underline transition-colors cursor-pointer"
                >Выйти
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}