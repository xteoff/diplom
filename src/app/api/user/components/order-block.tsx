import Divider from "@/app/shop/components/divider";
import { Prisma } from "@/generated/prisma";


export default function OrderBlock({
  order,
}: {
  order: Prisma.OrderGetPayload<{
    include: { orderItems: { include: { product: true } } };
  }>;
}) {
  return (
    <div className="flex px-3 py-2 flex-col bg-accent-500 rounded-md ">
      <InfoBlock title="ID заказа" data={order.id} />
      <InfoBlock
        title="Статус заказа"
        data={
          order.status === 0
            ? "Новый заказ"
            : order.status === 1
            ? "Заказ обработан"
            : "Заказ доставлен"
        }
      />
      <InfoBlock title="Адрес доставки" data={order.adress} />
      <p className="font-inter text-gray-200  font-medium pt-5">Товары:</p>
      {order.orderItems.map(
        (
          item: Prisma.OrderItemGetPayload<{ include: { product: true } }>
        ) => {
          return (
            <InfoBlock
              key={item.id + item.product.id}
              title={item.product.name}
              data={`кол-во: ${item.amount}`}
            />
          );
        }
      )}
    </div>
  );
}

function InfoBlock({ title, data }: { title: string; data: string }) {
  return (
    <p className="font-inter text-gray-200 ">
      {title}: <span className="font-medium text-white"> {data}</span>
    </p>
  );
}
