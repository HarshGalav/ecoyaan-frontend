import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, buyNow, generateGuid, setCartGuid } from '../cart/providers/cartSlice';
import productData from './csvjson.json';
import vegan from './vegan.png';
import sustainable from './sustainable.png';
import toast, { Toaster } from 'react-hot-toast';
import { AppDispatch } from '../../stores/stores';
import { styled } from "@mui/material";
import Rating from "@mui/material/Rating";
import ProductFilter from './ProductFilter';
import { addToWishlist, removeFromWishlist, selectWishlistItems } from '../wishlist/WishlistSlice';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { enqueue } from '../../providers/toast/toastProvider';
import { ToastType } from '../../providers/toast/toastState';

export interface Product {
  productId: number;
  productName: string;
  productDescription: string;
  productPrice: number;
  originalPrice: number;
  discount: number;
  reviews: number;
  rating: number;
  image: string;
  quantity: number;
  selected: boolean
}
import { FavoriteBorder, Share } from '@mui/icons-material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { ROUTES } from '../../utils/Routes';


const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#77AEBF",
  },
  "& .MuiRating-iconHover": {
    color: "#77AEBF",
  },
});
type OverlayProps = {
  show: boolean;
  onClick: () => void;
};

const Overlay: React.FC<OverlayProps> = ({ show, onClick }) => (
  <div
    className={`fixed inset-0 xs:bg-black lg:bg-white lg:bg-opacity-0 xs:bg-opacity-50 transition-opacity duration-300 ${
      show ? 'opacity-100' : 'opacity-0 pointer-events-none'
    }`}
    onClick={onClick}
    style={{ backdropFilter: show ? '' : 'none', zIndex: 2000 }}
  />
);
const ProductCard: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [sortOption, setSortOption] = useState<string>('low-to-high');
  const [filterOption, setFilterOption] = useState<string>('all');
  const cartGuid = useSelector(setCartGuid);
  const isLoggedIn = !!localStorage.getItem('accessToken');

  if (!isLoggedIn && !cartGuid) {
    dispatch(setCartGuid(generateGuid()));
  }


  const handleSortChange = (sortOption: string) => {
    setSortOption(sortOption);
  };

  const handleFilterChange = (filterOption: string) => {
    setFilterOption(filterOption);
  };


  const truncateDescription = (str: string, maxWords: number) => {
    const words = str.split(' ');
    if (words.length <= maxWords) {
      return str;
    }
    return `${words.slice(0, maxWords).join(' ')}...`;
  };

  const [loadingProducts, setLoadingProducts] = useState<{ [key: number]: boolean }>({});

  const addItemToBasket = async (product: any) => {
    const {
      id,
      Title,
      Discription,
      Price,
      Rating,
      'Image URL': image,
    } = product;
    
    const productToAdd = [{
      product_id: id,
      quantity: 1,
      is_selected: true
    }];
  
    try {
      dispatch(addItemToCart(productToAdd))
      dispatch(
        enqueue({
          id: Math.random().toString(),
          title: "Success",
          message: "Product added to cart!",
          type: ToastType.Success,
        }),
      );
    } 
    catch (error) {
      console.error('Error adding product to cart:', error);
      toast.error('An error occurred while adding the product to cart');
    } finally {
      setLoadingProducts(prev => ({ ...prev, [id]: false }));
    }
  };

  const wishlistItems = useSelector(selectWishlistItems);

  const convertToProduct = (product: any): Product => {
    return {
      productId: product.id,
      productName: product.Title,
      productDescription: product.Discription,
      productPrice: parseFloat(product.Price.toFixed(2)),
      originalPrice: parseFloat(product.Price.toFixed(2)),
      discount: 0,
      reviews: Math.floor(Math.random() * 500),
      rating: product.Rating,
      image: product['Image_URL'],
      quantity: 1,
      selected: true
    };
  };

  const isInWishlist = (productId: number) => wishlistItems.some(item => item.productId === productId);

  const handleHeartClick = (product: Product) => {
    if (isInWishlist(product.productId)) {
      dispatch(removeFromWishlist({ id: product.productId }));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  const filteredProducts = useMemo(() => {
    let products = productData;


    switch (sortOption) {
      case 'low-to-high':
        return products.sort((a, b) => a.Price - b.Price);
      case 'high-to-low':
        return products.sort((a, b) => b.Price - a.Price);
      case 'recommended':
        return products.sort((a, b) => b.Rating - a.Rating);

      default:
        return products;
    }
  }, [sortOption, filterOption]);

  const [openFilter, setOpenFilter] = useState<boolean>(false);

  const handleFilter = () => {
    setOpenFilter(!openFilter);
  }

  const handleBuyClick = async (product: any) => {
    try {
      await dispatch(buyNow([product.id]));
      navigate(ROUTES.PRODUCT_INFO, { state: { product} });
    } catch (error) {
      console.error('Error creating single product checkout:', error);
      toast.error('Failed to process the purchase. Please try again.');
    }
  };


  return (
    <div className='flex flex-col justify-center items-center'>
      <Overlay show={openFilter} onClick={() => setOpenFilter(false)}  />
      <div className="  pt-7 flex xs:flex-col lg:flex-col lg:gap-x-1 xl:gap-x-4 gap-y-3  ">
      <div className='w-full flex flex-col gap-y-3 md:px-4 lg:px-0  lg:pb-5 pt-20'>
        <p className='xs:text-xl md:text-3xl text-left'>Sustainable products </p>
        <p className='xs:text-xs md:text-base text-left text-gray-500'>  {productData.length} + products</p>
        </div>
       <div className='pt-7 flex xs:flex-col lg:flex-row lg:gap-x-1 xl:gap-x-4 gap-y-3 '>
        <div className='md:px-12 xs:px-3 lg:hidden  xs:flex border-t border-b py-2 md:gap-x-3 xs:gap-x-1 cursor-pointer'>
          <div className='xs:flex gap-x-1 lg:hidden items-center'>
            <FilterAltOutlinedIcon sx={{
              fontSize: {
                xs: "1.2rem",
                sm: "1.6rem"
              }, color: "green"
            }} onClick={handleFilter} />
            <p className="xs:text-sm  md:text-base w-24 xs:w-20 md:w-32 text-green-800 "
            onClick={handleFilter}>Filter</p>
          </div>
          <div className="xs:flex  lg:hidden gap-y-3 items-center">
            <label htmlFor="sort" className="xs:text-xs  md:text-sm xs:w-18 md:w-14 m-0 p-0 text-green-800 ">Sort by :</label>
            <select id="sort"
            onChange={(e) => handleSortChange(e.target.value)}
            value={sortOption}
              className="md:mt-1 cursor-pointer bg-white xs:text-xs md:text-sm block xs:w-32 md:w-40 p-1 outline-none  rounded-md">
              <option value="low-to-high">Price: Low to High</option>
              <option value="high-to-low">Price: High to Low</option>
              <option value="recommended">Recommended</option>
              <option value="relevant">Relevant</option>
            </select>
          </div>
        </div>
        <div className='xs:flex lg:hidden'>
          {openFilter && <ProductFilter
            onSortChange={handleSortChange}
            onFilterChange={handleFilterChange}
            onCloseFilter={handleFilter}
          />}
        </div>
        <div className='lg:flex xs:hidden'>
          <ProductFilter
            onSortChange={handleSortChange}
            onFilterChange={handleFilterChange}
            onCloseFilter={handleFilter}
          />
        </div>
      <div>
      <div className="xs:mt-4 justify-items-center lg:mt-0 grid xs:px-0 md:px-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:!grid-cols-4 lg:px-2 xs:gap-x-2 sm:gap-x-2 gap-y-3 md:gap-x-5 lg:gap-x-2 xl:gap-x-4 pb-7">
        
          {productData.map((product) => (
            <div
              key={product.id}
              className="product-card flex md:border bg-white border-gray-200 gap-x-2 rounded-3xl sm:p-[0.48rem] sm:flex-col xs:gap-y-1 md:gap-y-2 xs:min-w-[284px] md:min-w-[250px] lg:min-w-[22vw] xl:min-w-[280px] pb-2 w-[18rem] xs:w-[19rem] sm:w-48"
              
            >
              <div className="relative">
                <img
                  onClick={() => handleBuyClick(product)}
                  src={product['Image_URL']}
                  alt={product.Title}
                  className="rounded-3xl cursor-pointer w-72 h-72 sm:h-56 lg:h-60 md:w-full xs:w-[58rem] xs:h-40 border border-gray-200 object-contain "
                />
                <div className='bg-[#FFFFFFB2] opacity-90 flex items-center justify-center border border-shadow-one rounded-3xl absolute xs:top-2 md:top-3 xs:left-2 md:left-3 xs:p-2 md:p-3'>
                  <Share
                    className="cursor-pointer absolute"
                    sx={{
                      fontSize: {
                        xs: "14", md: "19",
                      }
                    }}
                  />
                </div>
                <div
                  className="bg-[#FFFFFFB2] border border-shadow-one opacity-90 flex items-center justify-center rounded-3xl absolute xs:top-2 md:top-3 xs:right-2 md:right-3 xs:p-2 md:p-3"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleHeartClick(convertToProduct(product));
                  }}
                >
                  {isInWishlist(product.id) ? (
                    <FavoriteIcon className="cursor-pointer absolute  text-red-600"
                      sx={{
                        fontSize: {
                          xs: "14", md: "19",
                        }
                      }} />
                  ) : (
                    <FavoriteBorderIcon className="cursor-pointer absolute hover:text-red-600"
                      sx={{
                        fontSize: {
                          xs: "14", md: "19",
                        }
                      }} />
                  )}
                </div>
                {/* <div onClick={() => addItemToBasket(product)} className="absolute bottom-2 right-4 xs:size-5 md:size-6 sm:size-6 bg-white/80 rounded-full flex items-center justify-center shadow-md cursor-pointer">
                {loadingProducts[product.id] ? (
                  <svg className="animate-spin md:size-5 lg:size-6 text-gray-600" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <ShoppingCartIcon className=" text-gray-600 hover:text-custom-blue xs:size-3 md:size-4" />
                )}
                <Toaster position="bottom-center" />
              </div> */}
              </div>
              <div className='flex flex-col items-center  justify-center  xs:px-1 md:px-2 xs:gap-y-3 md:gap-y-1'>

                <h2 className="xs:text-xs w-full md:h-14 cursor-pointer xs:line-clamp-3  md:line-clamp-2 sm:text-lg font-bold">{product.Title}</h2>
                <div className='xs:hidden sm:flex w-full'>
                  <p className="xs:text-[9px] sm:text-xs text-left line-clamp-2  text-gray-600">{product.Discription}</p>
                </div>
                <div className=" justify-center items-center xs:gap-x-10 md:gap-x-14  hidden">
                  <div className="flex items-center font-semibold">
                    <StyledRating
                      name="simple-controlled"
                      value={5}
                      sx={{
                        fontSize: {
                          xs: "0.8rem",
                          sm: "1rem",
                        },
                        "& .MuiRating-icon": {
                          width: {
                            xs: "0.8rem",
                            sm: "1.1rem",
                          }
                        },
                      }}
                      readOnly
                    />
                  </div>
                  <span className="text-gray-500 text-[10px]">
                    {Math.floor(Math.random() * 500)} reviews
                  </span>
                </div>
                <div className="flex w-full justify-between xs:px-0  md:px-2 xs:gap-x-2 md:gap-x-5 items-baseline">
                  <span className="md:text-xl xs:text-sm font-bold">
                    ₹{product.Price.toFixed(2)}
                  </span>
                  <span className="md:text-sm xs:text-xs text-red-700">-0%</span>

                  <span className="line-through text-gray-700 md:text-base xs:text-[10px]">
                    ₹{product.Price.toFixed(2)}
                  </span>
                </div>
                <div className="flex w-full justify-between xs:px-1  md:px-2">
                  <img className="sm:px-2 xs:h-10 xs:w-9 sm:h-14 sm:w-16 xs:py-1 md:py-2 text-xs" src={vegan} alt="vegan" />
                  <img className="sm:px-2 xs:h-10 xs:w-9 sm:h-14 sm:w-16 xs:py-1 md:py-2 text-xs" src={sustainable} alt="sustainable" />
                  <img className="sm:px-2 xs:h-10 xs:w-9 sm:h-14 sm:w-16 xs:py-1 md:py-2 text-xs" src={vegan} alt="vegan" />
                </div>
                <div className='flex flex-col items-center justify-center xs:px-1 md:px-2 xs:pt-0 md:pt-1 w-full'>
                  {/* <button
              type="submit"
              className="w-full px-5 xs:text-sm md:text-base bg-primary py-2 rounded-full font-semibold text-white shadow">
              Add to Cart
            </button> */}
                  {/* <button
              type="submit"
              className="w-full px-5 xs:text-xs md:text-base bg-primary sm:py-2 xs:py-1 rounded-full font-semibold text-white shadow">
              Add to Cart
            </button> */}

                  <button
                    onClick={() => addItemToBasket(product)}
                    className=" w-full  flex items-center justify-center cursor-pointer"
                  >
                    {loadingProducts[product.id] ? (
                      <svg className="animate-spin md:size-5 lg:size-6 text-gray-600" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    ) : (
                      <p className="w-full flex rounded-full justify-center px-5 xs:text-xs md:text-base bg-primary sm:py-1 xs:py-1 font-semibold text-white shadow">Add to cart</p>
                    )}
                  </button>
                </div>
              </div>
            </div>

          ))}

        </div>
       
      </div>
        </div>
      </div>
      
    </div>
  );
};

export default ProductCard;


