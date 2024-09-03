import { twMerge } from "tailwind-merge";
import { ICustomClass } from "../../../../types/CustomClass";
import ProductCard from "../Product/ProductCard";
import {
  PackagingType,
  ProductType,
} from "../../../../types/enums/ProductEnums";
import { ScrollableCarousel } from "../scrollableCarousel/ScrollableCarousel";
import { productstest } from "../../../../types/product/test";

interface IProductCarousel extends ICustomClass {}

export default function FeaturedProducts({ className = "" }: IProductCarousel) {
  return (
    <div className={twMerge("w-full", className)}>
      <ScrollableCarousel
        title="Featured Products"
        children={productstest.map((product, index) => ({
          child: (
            <ProductCard
              key={index}
              id={product.id}
              name={product.name}
              description={product.description}
              content={product.content}
              type={product.type}
              net_weight={product.net_weight}
              volumetric_weight={product.volumetric_weight}
              sku={product.sku}
              upc={product.upc}
              ean={product.ean}
              mpn={product.mpn}
              packaging_type={product.packaging_type}
              green_rating={product.green_rating}
              product_gallery={product.product_gallery}
              product_details={product.product_details}
            />
          ),
        }))}
        scrollOffset={60}
        actions={[
          <button className="m-0 text-anchor cursor-pointer md:text-xl xs:text-base">
            See All
          </button>,
        ]}
      />
    </div>
  );
}
