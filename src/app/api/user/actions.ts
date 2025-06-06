import { Prisma } from "@/generated/prisma";

export async function getOrderCabinet(userID: String): Promise<Prisma.OrderGetPayload<{
              include: { orderItems: { include: { product: true } } };
            }>[]> {
  try {
    const result = await fetch(`/api/order/user/${userID}`, {
      method: "GET",
    });

    console.log(result);

    if (result.status !== 200) return [];

    return result.json();
  } catch (error) {
    console.log(error);
    return [];
  }
}