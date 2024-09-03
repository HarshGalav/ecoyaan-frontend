import productData from "../../../config/productData.json";
import AddIcon from "@mui/icons-material/Add";
import { useState, useEffect } from "react";
import { styled } from "@mui/material";
import Rating from "@mui/material/Rating";
import ProductImage from "./ProductIconPart";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#77AEBF",
  },
  "& .MuiRating-iconHover": {
    color: "#77AEBF",
  },
});

interface BuyProductTogetherProps {
  Price: number;
}

const BuyProductTogether: React.FC<BuyProductTogetherProps> = ({ Price }) => {
  const { product } = productData;
  const [sum, setSum] = useState(Price);

  useEffect(() => {
    const total = product.more_products.reduce(
      (acc, curr) => acc + curr.price,
      Price,
    );
    setSum(total);
  }, [product.more_products, Price]);

  return (
    <>
      <div className="flex justify-center items-center py-3 2xl:px-8  xl:px-10 lg:px-0 md:px-20 sm:px-16 xs:px-4 w-full">
        <div className="flex justify-center flex-col xs:gap-y-5   sm:gap-y-16 2xl:w-4/5 xl:w-11/12 lg:w-11/12 xs:w-full ">
          <div className="md:px-2">
            <h1 className="text-primary-text font-bold md:text-2xl xl:text-2xl lg:text-xl sm:text-2xl xs:text-xl ">
              Frequently Bought Together
            </h1>
          </div>
          <div className="flex xs:flex-col sm:flex-col md:flex-col xl:flex-row justify-around gap-x-3 xs:gap-y-1 sm:gap-y-9 items-center xl:items-start 2xl:px-2 ">
            <div className="flex xs:flex-row sm:flex-row md:flex-row lg:flex-row xl:flex-row justify-center gap-y-3 2xl:w-4/5 max-w-full px-4 ">
              {product.more_products.map((product, index) => (
                <div
                  key={product.id}
                  className="flex items-center w-full 2xl:gap-x-6 sm:gap-x-1 xs:gap-x-3 "
                >
                  {index > 0 && (
                    <div className="flex items-start justify-center 2xl:px-14 xl:p-5 lg:p-6 md:p-6 sm:p-4 xs:p-1 mt-36 h-full">
                      <AddIcon sx={{ fontSize: "2.1rem" }} />
                    </div>
                  )}
                  <div className="flex xs:flex-col xl:flex-col lg:flex-col md:flex-col sm:flex-col gap-y-3 gap-x-3 sm:w-11/12 xs:w-5/6 pb-2 sm:px-4 xs:px-2">
                    <ProductImage
                      src={product.image}
                      alt={product.name}
                      showShare
                      showFavorite
                      showCart
                      showCheckbox
                    />
                    <div className="px-2 xs:flex-col xl:flex lg:flex md:flex sm:hidden xs:hidden justify-between py-2  md:w-56 lg:w-72 gap-y-2">
                      <h1 className="md:text-xl lg:text-xl font-bold">{product.name}</h1>
                      <div className="gap-y-3 flex flex-col">
                        <div>
                          <p
                            className="xs:text-sm lg:text-base leading-7 text-primary-text break-all"
                            style={{
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {product.description}
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center font-semibold">
                            <StyledRating
                              name="simple-controlled"
                              value={product.rating}
                              sx={{
                                fontSize: "1.2rem",
                                "& .MuiRating-icon": {
                                  width: "1.2rem",
                                },
                              }}
                              readOnly
                            />
                          </div>
                          <p className="grid text-secondary-text text-sm cursor-pointer">
                            {product.reviews_count} &nbsp; Reviews
                          </p>
                        </div>
                        <div className="flex gap-x-3 items-end">
                          <p className="text-2xl font-bold">
                            &#8377;{product.price}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className=" h-auto rounded-lg xl:w-3/5 md:w-4/6 xs:w-full flex flex-col shadow-sm items-center  p-2 py-8">
              <div className=" h-auto rounded-lg  gap-y-9  flex flex-col shadow-sm items-center">
                <h1 className="2xl:text-2xl xl:text-2xl">Total price: &#8377; {sum}</h1>
                <div className="flex flex-col xl:px-3 lg:px-1 md:px-3 sm:px-4 xs:px-2 gap-y-5">
                  <button
                    color="success"
                    className="rounded-full hover:bg-primary  border-2 border-primary hover:text-white text-primary 2xl:px-20 xl:px-7 lg:px-2 md:px-5 sm:px-4 xs:px-2 xs:p-2 xl:p-3 sm:py-3 text-lg"
                  >
                    Add all 3 to cart
                  </button>
                  <p className="text-sm leading-6 px-6">
                    Items are dispatched and sold by different sellers.{" "}
                    <span className="text-anchor">Show details</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BuyProductTogether;
