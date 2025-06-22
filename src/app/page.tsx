import AngelsPromo from "@/components/AngelsPromo/angels_promo";
import GalleryCollections from "@/components/GalleryCollections/gallery_collections";
import LoyalPromo from "@/components/LoyalPromo/loyal_promo";
import MascaraPromo from "@/components/MascaraPromo/mascara_promo";


export default function Home() {
  return (
    <>
      <AngelsPromo/>
      <MascaraPromo/>
      <LoyalPromo/>
      <GalleryCollections/>
    </>
    
  );
}
