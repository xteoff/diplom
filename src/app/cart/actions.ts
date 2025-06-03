"use server";
export async function createOrder(formData: FormData) {
  try {
    const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/order`, {
      method: "POST",
      body: formData,
    });

    if (result.status !== 201) return null;

    return result.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}
