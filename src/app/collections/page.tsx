import CollectionAng from "@/components/CollectionAng/collection_angel";
import CollectionMer from "@/components/CollectionMer/collection_mer";
import CollectionSwan from "@/components/CollectionSwan/collection_swan";

export default function Collections() {
  return (
    <>
      <details name="spisok">
        <summary className="list-none">
          <div className="flex justify-center h-fit pb-5">
            <img src="/Angels_banner.svg" alt="" />
          </div>
        </summary>
        <CollectionAng/>
      </details>

      <details name="spisok">
        <summary className="list-none">
          <div className="flex justify-center h-fit pb-5">
             <img src="/Swan_banner.svg" alt="" />
          </div>
        </summary>
        <CollectionSwan/>
      </details>

      <details name="spisok">
        <summary className="list-none">
          <div className="flex justify-center h-fit pb-5">
            <img src="/Mermaid_banner.svg" alt="" />
          </div>
        </summary>
        <CollectionMer/>
      </details>
    </>
  );
}