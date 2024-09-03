import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../stores/stores';
import { addItemToCart, selectItems, buyNow } from '../cart/providers/cartSlice';
import { removeFromWishlist, moveToBasket, selectWishlistItems } from './WishlistSlice';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { EllipsisHorizontalIcon, XMarkIcon, ArrowLeftIcon } from '@heroicons/react/24/solid';
import { ROUTES } from '../../utils/Routes';

const Wishlist: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const wishlistItems = useSelector(selectWishlistItems);
  const cartItems = useSelector(selectItems);
  const navigate = useNavigate();
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const handleMoveToBasket = (product: any) => {
    const productToCart = [{
      product_id: product.productId,
      quantity: product.quantity,
      is_selected: product.selected
    }];
    dispatch(addItemToCart(productToCart)).then(() => {
      dispatch(moveToBasket(product));
    });
  };

  const truncateDescription = (str: string, maxWords: number) => {
    const words = str.split(' ');
    if (words.length <= maxWords) {
      return str;
    }
    return `${words.slice(0, maxWords).join(' ')}...`;
  };

  const handleBuyClick = async (product: any) => {
    try {
      await dispatch(buyNow(product.productId));
      navigate(ROUTES.CONFIRM_PAYMENT);
    } catch (error) {
      console.error('Error creating single product checkout:', error);
      toast.error('Failed to process the purchase. Please try again.');
    }
  };

  const handleIconClick = (product: any) => {
    setSelectedProduct(product);
    setPopupVisible(true);
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
    setSelectedProduct(null);
  };

  const handleBackToProfile = () => {
    navigate(ROUTES.PROFILE); // Change '/profile' to your actual profile page route
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <div className="bg-white shadow-md rounded-lg p-10 w-full max-w-5xl relative">
        <div className="flex items-center justify-start">
          <ArrowLeftIcon
            className="w-6 h-6 text-gray-600 cursor-pointer"
            onClick={handleBackToProfile}
          />
          <h1 className="text-4xl font-extrabold ml-7">Your Wishlists</h1>
        </div>
        <div className="container mx-auto p-4 pt-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {wishlistItems.map((product) => (
              <div
                key={product.productId}
                className="flex flex-col self-stretch p-4 rounded-3xl border border-solid border-zinc-300 max-w-[308px] relative"
              >
                <div className="relative h-48 overflow-hidden rounded-t-lg mb-4">
                  <img
                    src={product.image}
                    alt={product.productName}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 w-8 h-8 cursor-pointer bg-white rounded-full flex items-center justify-center shadow-md">
                    <EllipsisHorizontalIcon
                      className="w-5 h-5 text-gray-800 cursor-pointer"
                      onClick={() => handleIconClick(product)}
                    />
                  </div>
                </div>
                <h2 className="text-xl font-semibold mb-2">{truncateDescription(product.productName, 8)}</h2>
                <div className="flex justify-center items-baseline mb-4">
                  <span className="text-lg font-bold mr-2">₹{product.productPrice}</span>
                </div>
                <button
                  className="justify-center items-center px-4 py-3 mt-6 text-base tracking-normal text-white bg-green-600/80 rounded-3xl"
                  onClick={() => handleMoveToBasket(product)}
                >
                  Move to Basket
                </button>
                <button
                  className="justify-center items-center px-4 py-3 mt-3 text-base tracking-normal text-white rounded-3xl bg-anchor"
                  onClick={() => handleBuyClick(product)}
                >
                  Buy Now
                </button>
                {popupVisible && selectedProduct?.productId === product.productId && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-3xl z-10">
                    <div className="flex flex-col justify-center p-4 text-base tracking-normal text-black rounded-3xl bg-neutral-800 bg-opacity-40 w-full max-w-[300px] mx-4">
                      <div className="flex flex-col p-4 bg-white rounded-3xl relative">
                        <XMarkIcon className='absolute top-2 right-2 w-6 h-6 cursor-pointer' onClick={handleClosePopup} />
                        <div className="p-3 cursor-pointer hover:bg-gray-200 rounded-full transition-all duration-500">View Detail</div>
                        <div className="p-3 cursor-pointer hover:bg-gray-200 rounded-full transition-all duration-500">Move</div>
                        <div className="p-3 cursor-pointer hover:bg-gray-200 rounded-full transition-all duration-500" onClick={() => dispatch(removeFromWishlist({id:product.productId}))}>Remove</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
