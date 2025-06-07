export async function getOrder(orderId: string) {
    try {
        const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/${orderId}`, {
        method: "GET",
    });
    if (result.status !== 201) return null;

    return result.json();
  } catch (error) {
    console.log(error);
    return null
    }
}