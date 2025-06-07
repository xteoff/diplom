import { Prisma } from "@/generated/prisma";

export async function getOrderCabinet(
  userID: string
): Promise<
  Prisma.OrderGetPayload<{
    include: { 
      orderItems: { include: { product: true } };
      invoice: true;
    };
  }>[]
> {
  try {
    const result = await fetch(`/api/order/user/${userID}`, {
      method: "GET",
    });

    if (!result.ok) {
      console.error("Failed to fetch orders:", result.status, result.statusText);
      return [];
    }

    const data = await result.json();
    
    // Убедимся, что каждый заказ имеет поле invoice (даже если null)
    return data.map((order: any) => ({
      ...order,
      invoice: order.invoice || null
    }));
    
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
}