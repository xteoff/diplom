import { Product } from "@/generated/prisma";
import { CollectionExtended } from "./components/collection";

export async function getProducts(): Promise<Product[]> {
  try {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/product`,
      {
        method: "GET",
        cache: "no-store",
      }
    );
    return result.json();
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getCollections(): Promise<CollectionExtended[]> {
  try {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/collections`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    if (result.status !== 201) return [];

    return result.json();
  } catch (error) {
    console.log(error);
    return [];
  }
}
