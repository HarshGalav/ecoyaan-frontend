import MyImpactInfo from "../myImpact-part/MyImpactInfo";
import AttributesPart from "./components/AttributesPart/AttributesPart";
import BlogPosts from "./components/BlogPostPart/BlogPosts";
import BrandsCarousel from "./components/BrandsPart/BrandsPart";
import BuyFromUs from "./components/BuyFromUs/BuyFromUs";
import CarouselPart from "./components/carousel/CarouselPart";
import CategoryCarousel from "./components/categories/CategoryCarousel";
import EcoyaanImpactPart from "./components/EcoyaanImpactPart/EcoyaanImpactPart";
import FeaturedProducts from "./components/FeaturedProduct/FeaturedProducts";
import InstagramFeeds from "./components/InstagramFeeds/InstagramFeeds";
import MyPledges from "./components/PledgePart/MyPledges";
import PledgePart from "./components/PledgePart/PledgePart";
import PremiumPart from "./components/PremiumPart/PremiumPart";
import RecentlyPurchased from "./components/RecentlyPurchased/RecentlyPurchased";
import RecentlyViewed from "./components/RecentlyViewed/RecentlyViewed";
import Testimonal from "./components/testimonals/Testimonal";

export default function Home() {
  return (
    <div className="flex flex-col md:gap-y-5 xs:gap-y-4 mb-16 mt-5 md:mt-8 lg:mt-10 xl:mt-12">
      <CategoryCarousel className="pagePadding" />
      <CarouselPart />
      <FeaturedProducts className="pagePadding" />
      <BrandsCarousel className="pagePadding" />
      <RecentlyViewed className="pagePadding" />
      <RecentlyPurchased className="pagePadding" />
      <PremiumPart className="pagePadding" />
      <AttributesPart className="pagePadding" />
      <div className="pagePadding flex flex-col md:gap-y-5 xs:gap-y-4">
        <MyPledges />
        <PledgePart />
        <EcoyaanImpactPart />
        <MyImpactInfo />
        <BlogPosts />
        <InstagramFeeds />
        <Testimonal />
        <BuyFromUs />
      </div>
    </div>
  );
}
