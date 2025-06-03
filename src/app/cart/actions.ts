export async function createOrder(formData: FormData) {
  console.log(formData)
  try {
    const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/order`, {
      method: "POST",
      body: formData,
    });
    console.log(result)

    if (result.status !== 201) return null;

    return result.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}
