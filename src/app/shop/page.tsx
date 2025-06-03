import { getCollections, getProducts } from "./actions";
import ShopList from "./components/shop-list";
import { CollectionExtended } from "./components/collection";
import CollectionNavigation from "./components/collection-nav";

export default async function ShopPage() {
  const collections = await getCollections();

  if (collections.length == 0)
    return (
      <div className="min-h-screen flex flex-col justify-start items-center gap-5 py-20 px-5 bg-red-50">
        <div className="flex flex-wrap gap-5">
          <p className="font-inter text-xl">
            Произошла ошибка при поиске товаров. Попробуйте обновить станицу
          </p>
        </div>
        <ShopList collectionsInit={collections} />
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col justify-start items-center gap-5 py-20 px-5 bg-red-50">
      <div className="flex flex-wrap gap-5">
        {collections.map((item: CollectionExtended) => {
          return <CollectionNavigation collection={item} key={item.id} />;
        })}
      </div>
      <ShopList collectionsInit={collections} />
    </div>
  );
}
