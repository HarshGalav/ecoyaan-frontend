import { Share, FavoriteOutlined, ShoppingCart } from "@mui/icons-material";
import Checkbox from "@mui/material/Checkbox";
import React from "react";

interface ProductImageProps {
  src: string;
  alt: string;
  showShare?: boolean;
  showFavorite?: boolean;
  showCart?: boolean;
  showCheckbox?: boolean;
}

const ProductImage: React.FC<ProductImageProps> = ({
  src,
  alt,
  showShare = false,
  showFavorite = false,
  showCart = false,
  showCheckbox = false,
}) => {
  return (
    <div className="relative w-fit">
      <img
        className="rounded-3xl relative object-fill h-60 md:min-w-56- xl:min-w-72 xs:min-w-32 md:min-w-56 lg:min-w-72  sm:min-w-52 xs:h-36 sm:h-52 lg:h-60"
        src={src}
        alt={alt}
      />
      {showShare && (
        <div className="bg-[#FFFFFFB2] opacity-70 items-center justify-center rounded-3xl absolute top-3 right-3 p-4 xl:flex lg:flex md:flex sm:hidden hidden">
          <Share className="cursor-pointer absolute" sx={{ fontSize: 20 }} />
        </div>
      )}
      {showFavorite && (
        <div className="bg-[#FFFFFFB2] opacity-70 xl:flex lg:flex md:flex sm:hidden hidden items-center justify-center rounded-3xl absolute left-3 bottom-3 p-4">
          <FavoriteOutlined
            className="cursor-pointer absolute"
            sx={{ fontSize: 20 }}
          />
        </div>
      )}
      {showCart && (
        <div className="bg-[#FFFFFFB2] opacity-70 xl:flex lg:flex md:flex sm:hidden hidden items-center justify-center rounded-3xl absolute right-3 bottom-3 p-4">
          <ShoppingCart
            className="cursor-pointer absolute"
            sx={{ fontSize: 20 }}
          />
        </div>
      )}
      {showCheckbox && (
        <div className=" opacity-70 xl:flex lg:flex md:flex sm:hidden hidden items-center justify-center rounded-3xl absolute left-3 top-2">
          <Checkbox
            defaultChecked
            className="flex items-start"
            color="success"
          />
        </div>
      )}
    </div>
  );
};

export default ProductImage;
