import { Product } from "@/generated/prisma";
import { CollectionExtended } from "./components/collection";

export async function getCollections(): Promise<CollectionExtended[]> {
  try {
    const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/collections`, {
      method: "GET",
    });
    console.log(result)
    if (!result.ok) {
      throw new Error(`HTTP error! status: ${result.status}`);
    }

    return await result.json();
  } catch (error) {
    console.error("Failed to fetch collections:", error);
    // throw error;
    return []
  }
}