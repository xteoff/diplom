import { Product } from "@/generated/prisma";
import { CollectionExtended } from "./components/collection";

export async function getCollections(): Promise<CollectionExtended[]> {
  try {
    const result = await fetch('/api/collections', {
      method: "GET",
      cache: "no-store",
    });

    if (!result.ok) {
      throw new Error(`HTTP error! status: ${result.status}`);
    }

    return await result.json();
  } catch (error) {
    console.error("Failed to fetch collections:", error);
    throw error;
  }
}