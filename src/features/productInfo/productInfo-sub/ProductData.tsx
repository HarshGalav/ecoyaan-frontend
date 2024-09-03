import { useState } from "react";
import { styled } from "@mui/material";
import Rating from "@mui/material/Rating";
import productData from "../../../config/productData.json";
import { FavoriteBorder, Share } from "@mui/icons-material";
import ProductPriceDetail from "./ProductPriceDetail";
import { pink } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PinterestIcon from "@mui/icons-material/Pinterest";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import LinkIcon from "@mui/icons-material/Link";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#77AEBF",
  },
  "& .MuiRating-iconHover": {
    color: "#77AEBF",
  },
});

interface ProductDataProps {
  selectedProduct: any;
  onRating: () => void;
}

export default function ProductData({
  selectedProduct,
  onRating,
}: ProductDataProps) {
  const { product } = productData;

  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleShareOpen = () => {
    console.log("line 34  is triggered");
    setIsShareOpen(!isShareOpen);
  };

  const handleOptions = (option: string) => {
    console.log("selected option: " + option);
  };

  console.log("line 48", selectedProduct);

  return (
    <>
      <div className="xs:hidden scroll-smooth  md:hidden sm:hidden xl:w-2/5 lg:w-1/2 2xl:w-2/6 lg:flex float-right lg:px-1  xl:flex flex-col ">
        <div className="flex flex-col gap-y-5 ">
          <div className="flex py-1 pt-4 justify-between items-center">
            <h1 className="text-3xl text-primary-text font-semibold">
              {product.name}
            </h1>
            <div className="flex gap-x-4 items-center">
              <div onClick={handleShareOpen} className="relative">
                <Share className="cursor-pointer" sx={{ fontSize: 28 }} />
                {isShareOpen && (
                  <div className="absolute top-full right-3 h-56 w-52  bg-white border border-gray-300 shadow-lg mt-1 rounded-md z-10">
                    <div className="w-full p-2 flex flex-col justify-between h-full text-sm">
                      <p className="border-b w-full border-gray-300 text-center p-2 flex flex-row items-center gap-x-2 cursor-pointer m-0">
                        <PinterestIcon /> Pinterest
                      </p>

                      <p className="border-b w-full text-center  border-gray-300 p-2 flex flex-row items-center gap-x-2 cursor-pointer m-0">
                        <FacebookIcon /> Facebook
                      </p>

                      <p className="border-b w-full text-center border-gray-300 p-2 flex flex-row items-center gap-x-2 cursor-pointer m-0">
                        {" "}
                        <EmailIcon />
                        Email
                      </p>

                      <p className="border-b border-gray-300 w-full text-center flex flex-row items-center gap-x-3  p-2 cursor-pointer m-0">
                        <XIcon sx={{ fontSize: "1.4rem" }} />X
                      </p>
                      <p className=" w-full text-center flex flex-row items-center gap-x-2 cursor-pointer p-2 m-0">
                        <LinkIcon />
                        Copy Link
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {isFavorite ? (
                <FavoriteIcon
                  className="cursor-pointer"
                  sx={{ color: pink[500], fontSize: 32 }}
                  onClick={toggleFavorite}
                />
              ) : (
                <FavoriteBorder
                  className="cursor-pointer"
                  sx={{ color: pink[500], fontSize: 32 }}
                  onClick={toggleFavorite}
                />
              )}
            </div>
          </div>
          <div>
            <p className="text-primary-text text-lg px-1 text-pretty leading-7">
              {product.description}
            </p>
          </div>
          <div className="text-sm flex flex-col pr-3 gap-y-3">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center font-semibold">
                {product.rating}
                <StyledRating
                  name="simple-controlled"
                  className="px-3 cursor-pointer"
                  value={product.rating}
                  sx={{
                    fontSize: "1.2rem",
                    "& .MuiRating-icon": {
                      width: "1.8rem",
                    },
                  }}
                  readOnly
                />
              </div>
              <p
                className="grid gap-x-5 pr-6 text-secondary-text cursor-pointer"
                onClick={onRating}
              >
                {product.reviews_count} &nbsp; Reviews
              </p>
            </div>
            <p className="px-1 text-secondary-text cursor-pointer">
              {product.purchased_last_month}+ &nbsp;bought in past month
            </p>
          </div>
          <ProductPriceDetail selectedProduct={selectedProduct} />
        </div>
      </div>
    </>
  );
}
