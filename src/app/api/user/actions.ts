"use server";

import { Order, Prisma } from "@/generated/prisma";

// export async function getOrders(userID: String) {
//   const result = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/api/order/user/${userID}`,
//     {
//       method: "GET",
//     }
//   );
//   return result.json();
// }

export async function getOrderCabinet(userID: String): Promise<Prisma.OrderGetPayload<{
              include: { orderItems: { include: { product: true } } };
            }>[]> {
  try {
    const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/order/user/${userID}`, {
      method: "GET",
    });

    console.log(result);

    if (result.status !== 201) return [];

    return result.json();
  } catch (error) {
    console.log(error);
    return [];
  }
}