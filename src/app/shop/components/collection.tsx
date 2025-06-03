import Card from "@/components/Card/card";
import { Collection, Product } from "@prisma/client";

export interface CollectionExtended extends Collection {
  products: Product[];
}

export default function CollectionItem({
  collection,
}: {
  collection: CollectionExtended;
}) {
  if (collection.products.length == 0) return null;

  return (
    <section
      className="flex flex-col gap-5 w-full justify-start scroll-m-20"
      id={collection.id}
    >
      <h3 className="text-2xl font-bold ">{collection.name}</h3>
      <div className="flex gap-5 flex-wrap justify-center sm:justify-start">
        {collection.products.map((product: Product) => {
          return <Card product={product} key={product.id} />;
        })}
      </div>
    </section>
  );
}
