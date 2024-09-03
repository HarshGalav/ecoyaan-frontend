import { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Share } from "@mui/icons-material";
import { styled } from "@mui/material";
import Rating from "@mui/material/Rating";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import recentlyViewed from "../../../../config/RecentlyViewed.json";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../stores/stores";
import { addItemToCart } from "../../../cart/providers/cartSlice";
import { enqueue } from "../../../../providers/toast/toastProvider";
import { ToastType } from "../../../../providers/toast/toastState";
import {
  addToWishlist,
  removeFromWishlist,
  selectWishlistItems,
} from "../../../wishlist/WishlistSlice";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { ROUTES } from "../../../../utils/Routes";
import { ICustomClass } from "../../../../types/CustomClass";
import { twMerge } from "tailwind-merge";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#77AEBF",
  },
  "& .MuiRating-iconHover": {
    color: "#77AEBF",
  },
});

interface RecentViewProduct {
  id: number;
  name: string;
  image: string;
  rating: number;
  reviews_count: number;
  discount: string;
  price: number;
  mrp: number;
  attributes: {
    name: string;
    img: string;
  }[];
}

interface IRecentProduct extends ICustomClass {}

export default function RecentlyViewed({ className = "" }: IRecentProduct) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftButton, setShowLeftButton] = useState<boolean>(false);
  const [showRightButton, setShowRightButton] = useState<boolean>(false);
  const [showSeeAll, setShowSeeAll] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const scroll = (scrollOffset: number) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: scrollOffset,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } =
          scrollContainerRef.current;
        setShowLeftButton(scrollLeft > 0);
        setShowRightButton(scrollLeft + clientWidth < scrollWidth);
      }
    };

    const handleResize = () => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } =
          scrollContainerRef.current;
        setShowLeftButton(scrollLeft > 0);
        setShowRightButton(scrollLeft + clientWidth < scrollWidth);
      }
    };

    if (scrollContainerRef.current) {
      scrollContainerRef.current.addEventListener("scroll", handleScroll);
      window.addEventListener("resize", handleResize);
      handleScroll();
      handleResize();

      return () => {
        scrollContainerRef.current?.removeEventListener("scroll", handleScroll);
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [recentlyViewed.product.recently_viewed.length]);

  useEffect(() => {
    console.log("line 64", recentlyViewed.product.recently_viewed.length);

    setShowSeeAll(recentlyViewed.product.recently_viewed.length >= 5);
  }, [recentlyViewed.product.recently_viewed.length]);
  const navigate = useNavigate();

  const addItemToBasket = async (product: RecentViewProduct) => {
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

  const handleHeartClick = (product: RecentViewProduct) => {
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
    <div
      className={twMerge(
        "flex overflow-hidden gap-y-7 py-3 justify-center items-center w-full",
        className,
      )}
    >
      <div className="flex justify-center flex-col gap-y-7 xs:w-full">
        <div className="flex justify-between">
          <h1 className="m-0 md:text-2xl xs:text-base font-semibold">
            Recently Viewed
          </h1>
          {showSeeAll ? (
            <button className="m-0 text-anchor md:text-xl xs:text-base">
              View All
            </button>
          ) : (
            <div className="w-[100px] h-[1px] hidden"></div>
          )}
        </div>
        <div className="relative flex items-center w-full">
          {showLeftButton && (
            <button
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 z-10 rounded-full isolate bg-white/90 shadow-xl ring-1 ring-black/5"
              onClick={() => scroll(-200)}
            >
              <FaChevronLeft />
            </button>
          )}
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto  pb-8  md:px-2 md:gap-y-9 xs:gap-x-3 md:gap-x-5"
          >
            {recentlyViewed.product.recently_viewed.map(
              (recentProduct, index) => (
                <div
                  key={index}
                  className="flex border bg-white border-gray-200 rounded-3xl p-[0.48rem] flex-col xs:gap-y-1 md:gap-y-2 xs:min-w-[196px] md:min-w-[250px] pb-2 w-[18rem] lg:min-w-[277px] xl:min-w-[280px] xs:w-52"
                >
                  <div className="relative">
                    <img
                      className="rounded-3xl w-72 h-72 md:h-56 lg:h-60 md:w-full  xs:w-44 xs:h-36 border border-gray-200 object-fill"
                      src={recentProduct.image}
                      alt={recentProduct.name}
                      onClick={() => navigate(ROUTES.PRODUCTS)}
                    />

                    <div className="bg-[#FFFFFFB2] opacity-90 flex items-center justify-center border border-shadow-one rounded-3xl absolute xs:top-2 md:top-3 xs:left-2 md:left-3 xs:p-2 md:p-3">
                      <Share
                        className="cursor-pointer absolute"
                        sx={{ fontSize: { xs: "14", md: "17" } }}
                      />
                    </div>
                    <div
                      className="bg-[#FFFFFFB2] border border-shadow-one opacity-90 flex items-center justify-center rounded-3xl absolute xs:top-2 md:top-3 xs:right-2 md:right-3 xs:p-2 md:p-3"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleHeartClick(recentProduct);
                      }}
                    >
                      {isInWishlist(recentProduct.id) ? (
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
                  <div className="xs:px-1 md:px-2 flex flex-col xs:gap-y-1 md:gap-y-1">
                    <h1 className="xs:text-xs xs:h-9 md:h-14 xs:line-clamp-2  md:line-clamp-2 md:text-lg font-bold">
                      {recentProduct.name}
                    </h1>
                    <h1 className="xs:text-[9px] sm:text-xs text-left line-clamp-2 text-gray-600">
                      Lorem ipsum dolor sit.
                    </h1>
                    <div className="gap-y-2 mt-1 flex flex-col">
                      <div className="items-center justify-between hidden">
                        <div className="flex items-center font-semibold">
                          <StyledRating
                            name="simple-controlled"
                            value={recentProduct.rating}
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
                          {recentProduct.reviews_count}&nbsp; Reviews
                        </p>
                      </div>
                      <div className="flex w-full justify-between xs:px-1  md:px-3 xs:gap-x-2 items-center">
                        <span className="md:text-sm xs:text-xs text-red-700">
                          {recentProduct.discount}
                        </span>
                        <p className="md:text-xl xs:text-sm font-semibold">
                          &#8377;{recentProduct.price}
                        </p>
                        <div className="flex flex-row gap-x-2 md:text-base xs:text-sm">
                          <span className="line-through text-gray-700 md:text-base xs:text-[10px]">
                            &#8377;{recentProduct.mrp}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex md:pb-2 border-gray-300 justify-between xs:px-3 gap-x-1 md:px-4">
                    {recentProduct.attributes &&
                      recentProduct.attributes.map((att, index) => (
                        <div
                          key={index}
                          className="flex flex-col xs:gap-y-2 md:gap-y-1 items-center"
                        >
                          <div className="md:w-7 p-1 rounded-full">
                            <img
                              src={att.img}
                              className="xs:size-4 md:size-4"
                              alt={att.name}
                            />
                          </div>
                          <p className="xs:text-[10px] md:text-xs text-center text-green-700">
                            {att.name}
                          </p>
                        </div>
                      ))}
                  </div>
                  <div className="flex items-center xs:px-1 md:px-2 xs:pt-2 md:pt-1 justify-center">
                    <button
                      onClick={() => addItemToBasket(recentProduct)}
                      className="bg-primary rounded-full text-white w-full xs:text-sm md:text-base py-1"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ),
            )}
          </div>
          {showRightButton && (
            <button
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 z-10 rounded-full isolate bg-white/90 shadow-xl ring-1 ring-black/5"
              onClick={() => scroll(200)}
            >
              <FaChevronRight />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
