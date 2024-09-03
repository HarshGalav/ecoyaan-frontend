import { twMerge } from "tailwind-merge";
import { ICustomClass } from "../../../../types/CustomClass";
import { ScrollableCarousel } from "../scrollableCarousel/ScrollableCarousel";
import LandingCategory from "../../../../config/LandingCategory.json";
import Category from "./Category";

interface ICategoryCarouselProps extends ICustomClass {}

export default function CategoryCarousel({
  className = "",
}: ICategoryCarouselProps) {
  const { categories } = LandingCategory;

  return (
    <div className={twMerge(className)}>
      <ScrollableCarousel
      showChevron ={true}
      chevronPosition="top-1/3"
      scrollOffset={100}
        children={categories.map((category, index) => ({
          child: (
            <Category
              key={index}
              title={category.name}
              avatarUrl={category.image}
              onClick={() => {}}
            />
          ),
        }))}
      />
    </div>
  );
}
