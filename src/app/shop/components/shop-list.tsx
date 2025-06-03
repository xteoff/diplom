"use client";
import { store } from "@/store/store";
import { useState } from "react";
import { Provider } from "react-redux";
import CollectionItem, { CollectionExtended } from "./collection";

export default function ShopList({
  collectionsInit,
}: {
  collectionsInit: CollectionExtended[];
}) {
  return (
    <Provider store={store}>
      <ShopInner collectionsInit={collectionsInit} />
    </Provider>
  );
}

function ShopInner({ collectionsInit }: { collectionsInit: CollectionExtended[] }) {
  const [collections, setCollections] = useState(collectionsInit);

  return (
    <div className="flex flex-col gap-10 justify-center items-center w-full max-w-[1350px]">
      
      {collections.map((item: CollectionExtended) => {
        return <CollectionItem collection={item} key={item.id} />;
      })}
    </div>
  );
}
