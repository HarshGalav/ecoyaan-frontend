import { CurrencyRupee } from "@mui/icons-material";
import { Product } from "../../../../types/product/product";
import {
  CurrencyRupeeIcon,
  HeartIcon,
  ShareIcon,
  StarIcon,
} from "@heroicons/react/24/solid";
import { HiCurrencyRupee, HiOutlineCurrencyRupee } from "react-icons/hi2";

function ProductCard(product: Product) {
  return (
    <div className="relative flex flex-col justify-start items-start p-[0.87rem] rounded-2xl border border-shadow-one xs:gap-y-1 md:gap-y-2 lg:gap-y-3 xs:w-52 sm:w-56 md:w-60 lg:w-64">
      <div className="relative">
        <ShareIcon className="absolute top-3 left-3 size-4" />
        <HeartIcon className="absolute top-3 right-3 size-4" />
        <img
          className="rounded-xl object-fill w-full"
          src={product.product_gallery[0].resource}
          alt={product.product_gallery[0].description}
        />
        <div className="flex absolute left-0 bottom-2 space-x-1 bg-shadow-three/50 p-2 rounded-r-full">
          <StarIcon className="size-3" />
          <p className="text-xs">4.5/5 (1012)</p>
        </div>
      </div>
      <h1 className="font-bold text-base">{product.name}</h1>
      <h1 className="font-normal text-xs/3 text-shadow-two">
        {product.description}
      </h1>
      {/* PRICING */}
      <div className="w-full flex flex-row justify-start items-center space-x-2 text-base font-light">
        <p className="flex">
          <CurrencyRupee className="size-4" fontSize="small" />
          2999
        </p>
        <p className="line-through">5999</p>
        <p className="flex-1"></p>
        <p className="text-primary ml-auto" >10% off</p>
      </div>
      <div className="flex md:pb-1  border-gray-300 justify-between xs:px-3 gap-x-1 lg:px-4">
        <div className="flex flex-col xs:gap-y-2 md:gap-y-1 items-center">
          <img src="/images/leaf.png" className="xs:size-4 md:size-4" />
        </div>
      </div>
      <button
        className="bg-primary rounded-xl text-white w-full xs:text-sm md:text-base py-2"
        onClick={() => {}}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
