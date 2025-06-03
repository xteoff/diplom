"use client";

import { useEffect, useState } from "react";
import { getOrderCabinet } from "../actions";
import { SessionProvider, useSession } from "next-auth/react";
import { Order, Prisma } from "@/generated/prisma";
import OrderBlock from "./order-block";
import Link from "next/link";

export default function OrdersList() {
  return (
    <SessionProvider>
      <OrdersListInner />
    </SessionProvider>
  );
}

function OrdersListInner() {
  const [orders, setOrders] = useState<Prisma.OrderGetPayload<{
              include: { orderItems: { include: { product: true } } };
            }>[]>([]);

  const session = useSession();

  useEffect(() => {
    (async () => {
      if (session.status !== "authenticated") return;
      const result = await getOrderCabinet(session.data?.user.id);

      console.log(result);

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
      <div className="px-5 py-3 bg-red-50 border-2 border-solid border-accent-500 rounded-md">
        <p className="font-inter text-xl text-center">У вас пока нет заказов</p>
        <Link
          href="/shop"
          className="font-inter text-primary-500 text-center hover:text-primary-300 cursor-pointer transition-all"
        >
          Вернуться к списку товаров
        </Link>
      </div>
    );

  return (
    <div>
      <h2 className="font-bold font-inter text-2xl">Ваши заказы:</h2>
      <div className="flex flex-col gap-5">
        {orders.map(
          (
            item: Prisma.OrderGetPayload<{
              include: { orderItems: { include: { product: true } } };
            }>
          ) => {
            return <OrderBlock key={item.id} order={item} />;
          }
        )}
      </div>
    </div>
  );
}
