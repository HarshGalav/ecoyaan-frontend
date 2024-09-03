import CarouselImages from "../../../../components/carousel/carousel-images";
import carouselData from "../../../../config/CarouselPart.json";
import MobileCarousel from "./MobileCarousel";
import mobileCarousel from "../../../../config/MobileCarousel.json";

export default function CarouselPart() {
  return (
    <div className="md:mt-2 xs:mt-1 ">
      <div>
        <CarouselImages images={carouselData}></CarouselImages>
        <MobileCarousel images={mobileCarousel}></MobileCarousel>
      </div>
    </div>
  );
}
