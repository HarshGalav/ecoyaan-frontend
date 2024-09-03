import { useState } from "react";
import productData from "../../../config/productData.json";

interface ProductImgProps {
  setSelectedProduct: (product: any) => void;
}

const ProductImg: React.FC<ProductImgProps> = ({ setSelectedProduct }) => {
  const { product } = productData;
  const [originalPicture, setOriginalPicture] = useState(product.image);

  const handleChangePicture = (thumbnail: any) => {
    setOriginalPicture(thumbnail.url);
    setSelectedProduct(thumbnail);
  };

  return (
    <div className="xl:sticky pt-2 lg:sticky md:static sm:static xs:static h-fit top-2 py-2 gap-y-9 2xl:w-2/5 xl:w-2/5 lg:w-1/2 flex items-center flex-col">
      <div>
        <img
          className="2xl:h-[34rem] xl:h-[32rem] lg:h-[46vh] md:h-[50vh] sm:h-[50vh] xs:h-[39vh] 2xl:w-[35vw] xl:w-[35vw] lg:w-[50vw] md:w-[67vw] sm:w-[77vw] xs:w-[92vw] xl:min-w-[35rem]  rounded-xl shadow-lg border border-[#d9d5dd]"
          src={originalPicture}
          alt="Original product"
        />
      </div>
      <div className="flex justify-center pt-2 max-w-[630px] flex-row xl:gap-x-5 lg:gap-x-5 md:gap-x-9 sm:gap-x-9 xs:gap-x-4">
        {product.thumbnails.map((thumbnail, index) => (
          <div key={index} className="border rounded-md">
            <img
              className={`xl:h-[10vh] lg:h-[9vh] md:h-[10vh] sm:h-[10vh] xs:h-[9vh] xl:w-[8vw] lg:w-[9vw] md:w-[13vw] sm:w-[14vw] xs:w-[18vw] cursor-pointer  hover:border-gray-500 hover:shadow-xl rounded-md
                        ${thumbnail.url === originalPicture ? "border border-gray-500" : "border border-gray-300"}
                        ${thumbnail.url === originalPicture ? "shadow-xl" : ""}`}
              src={thumbnail.url}
              alt={`Product Thumbnail ${index + 1}`}
              onMouseEnter={() => handleChangePicture(thumbnail)}
            />
          </div>
        ))}
      </div>
      <div className="py-4 px-3 border-dashed border-b-2 border-t-2 flex justify-center w-full border-gray-300 hover:border-green-400">
        <button className="text-2xl text-green-700 hover:text-green-700">
          Pledge: Eco-friendly
        </button>
      </div>
    </div>
  );
};

export default ProductImg;
