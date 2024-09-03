import { styled } from "@mui/material";
import Rating from "@mui/material/Rating";
import productData from "../../../config/productData.json";
import { Face, FavoriteBorder, Share } from "@mui/icons-material";

import { pink } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useState } from "react";
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
  onRatingClick: () => void;
}

interface ProductDataProps {
  onRatingClick: () => void;
}

export default function ProductNameDescription({
  onRatingClick,
}: ProductDataProps) {
  const { product } = productData;

  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const [isShareOpen, setIsShareOpen] = useState(false);

  const handleShareOpen = () => {
    console.log("line 34  is triggered");
    setIsShareOpen(!isShareOpen);
  };

  const handleOptions = (option: string) => {
    console.log("selected option: " + option);
  };

  return (
    <div className="xl:hidden  lg:hidden md:visible  md:w-4/5 sm:w-4/5 xs:w-full  md:px-9 sm:px-1 xs:px-1 py-1 xs:flex flex-col gap-y-4">
      <div className="flex  py-1 pt-4 justify-between items-center ">
        <h1 className="xl:text-4xl  lg:text-4xl md:text-4xl sm:text-4xl mb-0  xs:text-3xl text-primary-text font-semibold">
          {product.name}
        </h1>

        <div className="flex gap-x-4">
          <div onClick={handleShareOpen} className="relative">
            <Share className="cursor-pointer" sx={{ fontSize: 28 }} />
            {isShareOpen && (
              <div className="absolute top-full right-0 !h-[17rem]  w-44 bg-white border border-gray-300 shadow-lg rounded-md z-10">
                <div
                  className="w-full p-2 flex flex-col justify-between h-full text-sm"
                  onChange={(e) => handleOptions}
                >
                  <p className="border-b w-full border-gray-300 text-center p-2 flex flex-row items-center gap-x-2 cursor-pointer ">
                    <PinterestIcon /> Pinterest
                  </p>

                  <p className="border-b w-full text-center  border-gray-300 p-2 flex flex-row items-center gap-x-2 cursor-pointer">
                    <FacebookIcon /> Facebook
                  </p>

                  <p className="border-b w-full text-center border-gray-300 p-2 flex flex-row items-center gap-x-2 cursor-pointer">
                    {" "}
                    <EmailIcon />
                    Email
                  </p>

                  <p className="border-b border-gray-300 w-full text-center flex flex-row items-center gap-x-3  p-2 cursor-pointer">
                    <XIcon sx={{ fontSize: "1.4rem" }} />X
                  </p>
                  <p className=" w-full text-center flex flex-row items-center gap-x-2 cursor-pointer  p-2">
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
        <p className="text-primary-text break-all px-1 text-pretty md:text-lg xs:text-sm ">
          {product.description}
        </p>
      </div>
      <div className=" text-sm flex flex-col pr-3  gap-y-3">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center font-semibold">
            {product.rating}
            <StyledRating
              name="simple-controlled"
              className=" px-3"
              value={product.rating}
              sx={{
                fontSize: "1.2rem",
                "& .MuiRating-icon": {
                  width: "1.6rem",
                },
              }}
              readOnly
            />
          </div>
          <p
            onClick={onRatingClick}
            className="grid gap-x-5 xs:text-xs md:text-lg text-secondary-text cursor-pointer"
          >
            {product.reviews_count} &nbsp; Ratings
          </p>
        </div>
        <p className="px-1 text-secondary-text xs:text-xs md:text-lg cursor-pointer">
          50+ &nbsp;bought in past month
        </p>
      </div>
    </div>
  );
}
