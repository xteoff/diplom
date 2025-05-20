import HowItWorks from "@/components/HowItWorks/how_it_works";
import OtherThings from "@/components/OtherThings/other_things";
import PromotionPromo from "@/components/PromotionPromo/promotion_promo";
import WhatsIn from "@/components/WhatsIn/whats_in";

export default function Promotions() {
  return (
    <>
      <PromotionPromo/>
      <HowItWorks/>
      <WhatsIn/>
      <OtherThings/>
    </>
  );
}