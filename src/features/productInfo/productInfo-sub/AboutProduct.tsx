import productData from "../../../config/productData.json";
import BuyProductTogether from "./BuyProductTogether";

export default function AboutProduct() {
  const { product } = productData;

  const { seller } = productData;

  return (
    <>
      <div className=" flex justify-center items-center py-2 2xl:px-8 xl:px-10 lg:px-0 md:px-24 sm:px-16 xs:px-2 w-full">
        <div className="flex justify-center flex-col  gap-y-6 2xl:w-4/5 xl:w-11/12 lg:w-11/12">
          <h1 className="md:text-2xl xl:text-2xl lg:text-xl sm:text-2xl xs:text-xl px-2 font-bold">
            About this Item
          </h1>
          <div className="grid text-gray-600 gap-y-4 px-4 text-base">
            {product.about.map((about, index) => (
              <li key={index} className="leading-8">
                {about}
              </li>
            ))}
            {product.product_Features && (
              <div className="flex flex-col gap-y-5 xl:px-0 lg:px-3 md:px-1 sm:px-1 xs:px-0">
                <h1 className="sm:text-2xl xs:text-xl text-gray-900 font-semibold">
                  {product.product_Features.heading}
                </h1>
                <ul className="xl:px-8 lg:px-8 md:px-3 sm:px-3 xs:px-2 flex flex-col gap-y-3">
                  {product.product_Features.features.map((feature, index) => (
                    <li key={index} className="list-disc">
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
