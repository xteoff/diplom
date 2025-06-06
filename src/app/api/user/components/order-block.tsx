import { Prisma } from "@/generated/prisma";


export default function OrderBlock({
  order,
}: {
  order: Prisma.OrderGetPayload<{
    include: { orderItems: { include: { product: true } } };
  }>;
}) {
  return (
    <div className="flex px-3 py-2 border flex-col bg-accent-500 rounded-md ">
      <InfoBlock title="ID заказа" data={order.id} />
      <InfoBlock
        title="Статус заказа"
        data={
          order.status === 0
            ? "Новый заказ"
            : order.status === 1
            ? "Заказ в доставке"
            : "Заказ доставлен"
        }
      />
      <InfoBlock title="Адрес доставки" data={order.adress} />
      <p className="font-bold text-black pt-5">Перечень товаров:</p>
      {order.orderItems.map(
        (
          item: Prisma.OrderItemGetPayload<{ include: { product: true } }>
        ) => {
          return (
            <InfoBlock
              key={item.id + item.product.id}
              title={item.product.name}
              data={`${item.amount} шт.`}
            />
          );
        }
      )}
    </div>
  );
}

function InfoBlock({ title, data }: { title: string; data: string }) {
  return (
    <p className="font-inter text-[rgb(135,61,61)] ">
      {title}: <span className="font-light text-black"> {data}</span>
    </p>
  );
}
