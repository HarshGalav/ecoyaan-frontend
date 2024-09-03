import { Share } from "@mui/icons-material";
import { styled } from "@mui/material";
import Rating from "@mui/material/Rating";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import recentlyPurchased from "../../../../config/RecentlyPurchased.json";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../stores/stores";
import { addItemToCart } from "../../../cart/providers/cartSlice";
import { enqueue } from "../../../../providers/toast/toastProvider";
import { ToastType } from "../../../../providers/toast/toastState";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  addToWishlist,
  removeFromWishlist,
  selectWishlistItems,
} from "../../../wishlist/WishlistSlice";
import { ROUTES } from "../../../../utils/Routes";
import { ICustomClass } from "../../../../types/CustomClass";
import { twMerge } from "tailwind-merge";

interface RecentPurchasedProduct {
  id: number;
  name: string;
  image: string;
  rating: number;
  reviews_count: number;
  discount: string;
  price: number;
  mrp: number;
  in_stock: boolean;
  attributes: {
    name: string;
    img: string;
  }[];
}
const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#77AEBF",
  },
  "& .MuiRating-iconHover": {
    color: "#77AEBF",
  },
});

interface IProductCarouselInterface extends ICustomClass {}

export default function RecentlyPurchased({
  className = "",
}: IProductCarouselInterface) {
  const dispatch = useDispatch<AppDispatch>();

  const addItemToBasket = async (product: RecentPurchasedProduct) => {
    const { id } = product;

    const productToAdd = [
      {
        product_id: id,
        quantity: 1,
        is_selected: true,
      },
    ];

    try {
      dispatch(addItemToCart(productToAdd));
      dispatch(
        enqueue({
          id: Math.random().toString(),
          title: "Success",
          message: "Product added to cart!",
          type: ToastType.Success,
        }),
      );
    } catch (error) {
      console.error("Error adding product to cart:", error);
      dispatch(
        enqueue({
          id: Math.random().toString(),
          title: "Error",
          message: "An error occurred while adding the product to cart",
          type: ToastType.Error,
        }),
      );
    }
  };

  const wishlistItems = useSelector(selectWishlistItems);
  const isInWishlist = (productId: number) =>
    wishlistItems.some((item) => item.productId === productId);

  const handleHeartClick = (product: RecentPurchasedProduct) => {
    const productInWishlist = {
      productId: product.id,
      productName: product.name,
      productDescription: "",
      productPrice: product.price,
      originalPrice: product.mrp,
      discount: 0,
      rating: product.rating,
      reviews: product.reviews_count,
      image: product.image,
      quantity: 1,
      selected: true,
    };
    if (isInWishlist(product.id)) {
      dispatch(removeFromWishlist({ id: product.id }));
    } else {
      dispatch(addToWishlist(productInWishlist));
    }
  };

  return (
    <div className={twMerge("flex flex-col py-3 gap-y-7 w-full", className)}>
      <div className="flex justify-between">
        <h1 className="m-0 md:text-2xl xs:text-base font-semibold">
          {recentlyPurchased.sectionTitle}
        </h1>
        {/* <button className="m-0 text-anchor md:text-xl xs:text-base">View All</button> */}
      </div>

      <div className="flex overflow-x-auto  pb-8  md:px-2 md:gap-y-9 xs:gap-x-3 md:gap-x-5">
        {recentlyPurchased.product.recently_purchased.map(
          (recentPurchase, index) => (
            <div
              key={recentPurchase.id}
              className="flex border bg-white border-gray-200 rounded-3xl p-[0.48rem] flex-col xs:gap-y-1 md:gap-y-2 xs:min-w-[196px] md:min-w-[250px] pb-2 w-[18rem] lg:min-w-[277px] xl:min-w-[280px] xs:w-52"
            >
              <div className="relative ">
                <img
                  className="cursor-pointer rounded-3xl w-72 h-72 md:h-56 lg:h-60 md:w-full  xs:w-44 xs:h-36 border border-gray-200 object-fill"
                  src={recentPurchase.image}
                  alt={recentPurchase.name}
                  onClick={() => useNavigate()(ROUTES.PRODUCTS)}
                />
                <div className="bg-[#FFFFFFB2] opacity-90 flex items-center justify-center border border-shadow-one rounded-3xl absolute top-3 left-3 p-3">
                  <Share
                    className="cursor-pointer absolute"
                    sx={{
                      fontSize: {
                        xs: "14",
                        md: "19",
                      },
                    }}
                  />
                </div>
                <div
                  className="bg-[#FFFFFFB2] border border-shadow-one opacity-90 flex items-center justify-center rounded-3xl absolute xs:top-2 md:top-3 xs:right-2 md:right-3 xs:p-2 md:p-3"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleHeartClick(recentPurchase);
                  }}
                >
                  {isInWishlist(recentPurchase.id) ? (
                    <FavoriteIcon
                      className="cursor-pointer absolute  text-red-600"
                      sx={{
                        fontSize: {
                          xs: "14",
                          md: "19",
                        },
                      }}
                    />
                  ) : (
                    <FavoriteBorderIcon
                      className="cursor-pointer absolute hover:text-red-600"
                      sx={{
                        fontSize: {
                          xs: "14",
                          md: "19",
                        },
                      }}
                    />
                  )}
                </div>
              </div>
              <div className=" xs:px-1 md:px-2 flex flex-col xs:gap-y-1 md:gap-y-1">
                <h1 className="xs:text-xs xs:h-9 md:h-14 xs:line-clamp-2  md:line-clamp-2 md:text-lg font-bold">
                  {recentPurchase.name}
                </h1>
                <h1 className="xs:text-[9px] sm:text-xs text-left line-clamp-2 text-gray-600">
                  Lorem ipsum dolor sit.
                </h1>
                <div className="gap-y-2  mt-1 flex flex-col">
                  <div className="hidden items-center justify-between ">
                    <div className="flex items-center font-semibold">
                      <StyledRating
                        name="simple-controlled"
                        value={recentPurchase.rating}
                        sx={{
                          fontSize: {
                            xs: "0.9rem",
                            sm: "0.9rem",
                          },
                          "& .MuiRating-icon": {
                            width: {
                              xs: "0.9rem",
                              sm: "1rem",
                            },
                          },
                        }}
                        readOnly
                      />
                    </div>
                    <p className="grid text-secondary-text xs:text-xs sm:text-xs cursor-pointer">
                      {recentPurchase.reviews_count}&nbsp; Reviews
                    </p>
                  </div>
                  <div className="flex w-full justify-between xs:px-1  md:px-3 xs:gap-x-2 items-center">
                    <span className="md:text-sm xs:text-xs text-red-700">
                      {recentPurchase.discount}
                    </span>
                    <p className="md:text-xl xs:text-sm font-semibold">
                      &#8377;{recentPurchase.price}
                    </p>
                    <div className="flex flex-row gap-x-2 md:text-base xs:text-sm ">
                      <span className="line-through text-gray-700 md:text-base xs:text-[10px] ">
                        &#8377;{recentPurchase.mrp}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex md:pb-1  border-gray-300 justify-between xs:px-3 gap-x-1 lg:px-4">
                {recentPurchase.attributes &&
                  recentPurchase.attributes.map((att, index) => (
                    <div
                      key={index}
                      className="flex flex-col xs:gap-y-2 md:gap-y-1 items-center"
                    >
                      <div className=" md:w-7 p-1 rounded-full">
                        <img
                          src={att.img}
                          className="xs:size-4 md:size-4"
                          alt={att.name}
                        />
                      </div>
                      <p className="xs:text-[10px] md:text-xs  text-center text-green-700">
                        {att.name}
                      </p>
                    </div>
                  ))}
              </div>

              <div className="flex items-center xs:px-1 md:px-2 xs:pt-2 md:pt-1 justify-center">
                <button
                  onClick={() => addItemToBasket(recentPurchase)}
                  className="bg-primary rounded-full text-white w-full xs:text-sm md:text-base py-1"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  );
}
