export async function registrate(formData: FormData): Promise<string> {
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/registration`,
    {
      method: "POST",
      body: formData,
    }
  );

  return result.json();
}
