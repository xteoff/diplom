import { getCollections } from "./actions";
import ShopList from "./components/shop-list";
import { CollectionExtended } from "./components/collection";
import CollectionNavigation from "./components/collection-nav";

export default async function ShopPage() {
  // try {
    const collections = await getCollections();

    return (
      <div className="min-h-screen flex flex-col justify-start items-center gap-5 py-20 px-5 bg-red-50">
        <div className="flex flex-wrap gap-5">
          {collections.map((item: CollectionExtended) => (
            <CollectionNavigation collection={item} key={item.id} />
          ))}
        </div>
        <ShopList collectionsInit={collections} />
      </div>
    );
  // } catch (error) {
  //   return (
  //     <div className="min-h-screen flex flex-col justify-center items-center gap-5 py-20 px-5 bg-red-50">
  //       <p className="font-inter text-xl">
  //         Произошла ошибка при загрузке товаров. Пожалуйста, попробуйте обновить страницу
  //       </p>
  //     </div>
  //   );
  // }
}