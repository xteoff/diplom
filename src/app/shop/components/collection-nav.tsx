import Link from "next/link";
import { CollectionExtended } from "./collection";

export default function CategoryNavigation({
  collection,
}: {
  collection: CollectionExtended;
}) {
  if (collection.products.length == 0) return null;

  return (
    <Link
      className=" font-inter text-[rgb(135,61,61)] bg-[rgb(252,218,218)] hover:bg-accent-400 active:bg-accent-300 hover:scale-105 shadow-accent-200 hover:shadow transition-all px-3 py-2 rounded-md"
      href={`/shop/#${collection.id}`}
    >
      {collection.name}
    </Link>
  );
}
