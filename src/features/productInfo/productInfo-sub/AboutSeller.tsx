import React from "react";
import productData from "../../../config/productData.json";

export default function AboutSeller() {
  const { seller } = productData;

  return (
    <div className=" flex justify-center items-center  py-2 2xl:px-8 xl:px-10 lg:px-0 md:px-24 sm:px-16 xs:px-2 w-full">
      <div className="flex justify-center flex-col  gap-y-6 2xl:w-4/5 xl:w-11/12 lg:w-11/12">
        <h1 className="md:text-2xl xl:text-2xl lg:text-xl sm:text-2xl xs:text-xl px-2 font-bold">
          {seller.title}
        </h1>
        <div className="flex flex-col gap-y-6">
          {seller.content.map((item, index) => (
            <React.Fragment key={index}>
              {item.image && (
                <div className="flex w-full items-center justify-center">
                  <img src={item.image} alt="Seller" />
                </div>
              )}

              {item.description && (
                <p className="text-lg xl:px-10  lg:px-10 md:px-4 sm:px-4 xs:px-2 !leading-9">
                  {item.description}
                </p>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
