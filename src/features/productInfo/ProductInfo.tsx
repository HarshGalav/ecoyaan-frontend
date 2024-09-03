import { useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import ProductData from "./productInfo-sub/ProductData";
import ProductImg from "./productInfo-sub/ProductImg";
import AboutProduct from "./productInfo-sub/AboutProduct";
import BuyProductTogether from "./productInfo-sub/BuyProductTogether";
import productData from "../../config/productData.json";
import ReviewsCont from "./reviewsPart/ReviewsCont";
import RelatedProductPart from "./RelatedProducts/RelatedProductPart";
import AboutSeller from "./productInfo-sub/AboutSeller";
import ProductNameDescription from "./productInfo-sub/ProductNameDesc";
import ProductPriceDetail from "./productInfo-sub/ProductPriceDetail";
import { useLocation } from "react-router-dom";

export default function ProductInfo() {

  const { product } = productData;
 
  const reviewsRef = useRef<HTMLDivElement>(null);
  const [selectedProduct, setSelectedProduct] = useState(product);
  
  const handleScrollToReviews = () => {
    if (reviewsRef.current) {
      reviewsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };


  return (
    <>
      <Helmet>
        <title>Product</title>
        <meta name="product" content="Product Details" />
      </Helmet>
      <div className="flex flex-row justify-center items-start gap-8 pb-7">
        <div className="w-full flex flex-col gap-y-5 mt-2">
          <div className="w-full flex xs:flex-col xl:flex-row lg:flex-row md:flex-col sm:flex-col justify-center xl:items-start lg:items-start md:items-center sm:items-center xs:items-center gap-x-9 2xl:px-8 xl:px-4 lg:px-12 md:px-5 sm:px-2 xs:px-2 py-11 xl:pb-5 lg:pb-5 md:pb-2 sm:pb-2 xs:pb-2 pt-16 gap-y-6">
            <ProductNameDescription onRatingClick={handleScrollToReviews} />
            <div className="w-full flex xs:flex-col xl:flex-row lg:flex-row md:flex-col sm:flex-col justify-center xl:items-start lg:items-start md:items-center sm:items-center xs:items-center gap-x-16">
              <ProductImg setSelectedProduct={setSelectedProduct} />
              <ProductData
                selectedProduct={selectedProduct}
                onRating={handleScrollToReviews}
              />
            </div>
            <div className="xl:hidden lg:hidden w-full">
              <ProductPriceDetail selectedProduct={selectedProduct} />
            </div>
          </div>
          <div className="w-full flex  xs:flex-col justify-center  xs:items-center gap-x-4 xl:px-12 lg:px-0 md:px-9 sm:px-2 xs:px-1 py-11 xl:pb-5 lg:pb-5 md:pb-2 sm:pb-2 xs:pb-2 xs:pt-1 lg:pt-12 gap-y-6">
            <AboutProduct />
            <AboutSeller />
            <BuyProductTogether Price={product.price} />
            <div
              ref={reviewsRef}
              className="flex justify-center items-center py-2 2xl:px-8 xl:px-12 lg:px-0 md:px-24 sm:px-16 xs:px-2 w-full"
            >
              <ReviewsCont />
            </div>
            <RelatedProductPart />
          </div>
        </div>
      </div>
    </>
  );
}
