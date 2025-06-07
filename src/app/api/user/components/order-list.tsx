// components/orders-list.tsx
"use client";

import { useEffect, useState } from "react";
import { getOrderCabinet } from "../actions";
import { SessionProvider, signOut, useSession } from "next-auth/react";
import { Prisma } from "@/generated/prisma";
import OrderBlock from "./order-block";
import Link from "next/link";
import { useRouter } from 'next/navigation'

export default function OrdersList() {
  return (
    <SessionProvider>
      <div>
        <Dashboard/>
      </div>
      <div className="flex flex-col justify-center items-center py-20">
        <OrdersListInner />
      </div>
    </SessionProvider>
  );
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

function OrdersListInner() {
  const [orders, setOrders] = useState<Prisma.OrderGetPayload<{
    include: { 
      orderItems: { include: { product: true } };
      invoice: true;
    };
  }>[]>([]);

  const session = useSession();

  useEffect(() => {
    (async () => {
      if (session.status !== "authenticated") return;
      const result = await getOrderCabinet(session.data?.user.id);
      setOrders(result);
    })();
  }, [session.status]);

  if (session.status == "loading")
    return (
      <>
        <div className="px-5 py-3 bg-red-50 border-2 border-solid border-accent-500 rounded-md">
          <p className="font-inter text-xl text-center">Загрузка...</p>
        </div>
      </>
    );

  if (session.status == "authenticated" && !orders.length)
    return (
      <div className="bg-red-50">
        <p className="font-inter text-xl text-center">У вас пока нет заказов</p>
        <Link
          href="/shop"
          className="font-inter text-[rgb(135,61,61)] text-center hover:underline hover:text-primary-300 cursor-pointer transition-all"
        >
          Вернуться к списку товаров
        </Link>
      </div>
    );

  return (
    <div>
      <h2 className="font-bold text-2xl">Ваши заказы:</h2>
      <div className="flex flex-col gap-5">
        {orders.map((item) => (
          <OrderBlock key={item.id} order={item} />
        ))}
      </div>
    </div>
  );
}