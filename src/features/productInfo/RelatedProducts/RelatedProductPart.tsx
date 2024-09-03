import { FavoriteOutlined, Share, ShoppingCart } from "@mui/icons-material";
import { styled } from "@mui/material";
import Rating from "@mui/material/Rating";
import productData from "../../../config/productData.json";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#77AEBF",
  },
  "& .MuiRating-iconHover": {
    color: "#77AEBF",
  },
});

export default function RelatedProductPart() {
  const { product } = productData;

  return (
    <div className="flex overflow-hidden justify-center items-center 2xl:px-8 xl:px-10 lg:px-0 md:px-28 sm:px-16 xs:px-4 w-full">
      <div className="flex justify-center flex-col gap-y-6 2xl:w-4/5 xl:w-11/12 lg:w-11/12 xs:w-full">
        <div>
          <h1 className="md:text-2xl xl:text-2xl lg:text-xl sm:text-2xl xs:text-2xl font-bold">
            Related Products
          </h1>
        </div>
        <div className="flex overflow-x-auto hide-scrollbar py-5 px-2 gap-y-9 gap-x-9">
          {product.related_products.map((relatedProduct, index) => (
            <div
              key={relatedProduct.id}
              className="flex flex-col gap-y-3 sm:min-w-[260px] pb-5 w-[18rem] xs:w-52 "
            >
              <div className="relative">
                <img
                  className="rounded-3xl sm:size-80 xs:h-64 object-cover "
                  src={relatedProduct.image}
                  alt={relatedProduct.name}
                />
                <div className="bg-[#FFFFFFB2] opacity-70 flex items-center justify-center rounded-3xl absolute top-3 right-3 p-4">
                  <Share
                    className="cursor-pointer absolute"
                    sx={{ fontSize: 20 }}
                  />
                </div>
                <div className="bg-[#FFFFFFB2] opacity-70 flex items-center justify-center rounded-3xl absolute left-3 bottom-3 p-4">
                  <FavoriteOutlined
                    className="cursor-pointer absolute"
                    sx={{ fontSize: 20 }}
                  />
                </div>
                <div className="bg-[#FFFFFFB2] opacity-70 flex items-center justify-center rounded-3xl absolute right-3 bottom-3 p-4">
                  <ShoppingCart
                    className="cursor-pointer absolute"
                    sx={{ fontSize: 20 }}
                  />
                </div>
              </div>
              <div className="px-2 flex flex-col gap-y-2">
                <h1 className=" xs:text-lg sm:text-2xl font-bold">{relatedProduct.name}</h1>
                <div className="gap-y-3 flex flex-col">
                  <div>
                    <p
                      className="xs:text-sm sm:text-base leading-6 text-primary-text break-all"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {relatedProduct.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center font-semibold">
                      <StyledRating
                        name="simple-controlled"
                        value={relatedProduct.rating}
                        sx={{
                          fontSize: "1.2rem",
                          "& .MuiRating-icon": {
                            width: "1.3rem",
                          },
                        }}
                        readOnly
                      />
                    </div>
                    <p className="grid text-secondary-text xs:text-xs sm:text-sm cursor-pointer">
                      {relatedProduct.reviews_count} &nbsp; Reviews
                    </p>
                  </div>
                  <div className="flex xs:gap-x-2 sm:gap-x-3 items-end">
                    <span className="sm:text-base xs:text-sm text-red-700">
                      {relatedProduct.discount}
                    </span>
                    <div className="flex flex-row gap-x-2 sm:text-base xs:text-sm ">
                      M.R.P
                      <span className="line-through text-gray-700 sm:text-base xs:text-sm ">
                        &#8377;{relatedProduct.mrp}
                      </span>
                    </div>
                    <p className="sm:text-2xl xs:text-xl font-bold">
                      &#8377;{relatedProduct.price}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex pt-1  border-gray-300 justify-between lg:px-4">
                {relatedProduct.attributes &&
                  relatedProduct.attributes.map((att, index) => (
                    <div
                      key={index}
                      className="flex flex-col gap-y-4 items-center"
                    >
                      <div className=" w-8 p-1 rounded-full">
                        <img src={att.img} className="w-9 h-8" alt={att.name} />
                      </div>
                      <p className="text-xs font-semibold text-green-700">
                        {att.name}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
