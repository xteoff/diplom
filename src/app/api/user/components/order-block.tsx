// components/order-block.tsx
'use client';

import { Invoice, Prisma } from "@/generated/prisma";
import Link from 'next/link';

export default function OrderBlock({
  order,
}: {
  order: Prisma.OrderGetPayload<{
    include: { 
      orderItems: { include: { product: true } };
      invoice: true;
    };
  }>;
}) {
  return (
    <div className="flex px-3 py-2 border flex-col bg-accent-500 rounded-md">
      <InfoBlock title="ID заказа" data={order.id} />
      <InfoBlock
        title="Статус заказа"
        data={
          order.status === 0
            ? "Новый заказ"
            : order.status === 1
            ? "Заказ в доставке"
            : "Заказ доставлен"
        }
      />
      <InfoBlock title="Адрес доставки" data={order.adress} />
      <p className="font-bold text-black pt-5">Перечень товаров:</p>
      {order.orderItems.map((item) => (
        <InfoBlock
          key={item.id + item.product.id}
          title={item.product.name}
          data={`${item.amount} шт.`}
        />
      ))}
      
      <Link 
        href={`/orders/${order.id}`}
        className="mt-4 text-[rgb(135,61,61)] hover:underline font-medium"
      >
        Просмотреть детали заказа
      </Link>
    </div>
  );
}

function InfoBlock({ title, data }: { title: string; data: string }) {
  return (
    <p className="font-inter text-[rgb(135,61,61)]">
      {title}: <span className="font-light text-black"> {data}</span>
    </p>
  );
}