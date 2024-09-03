import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCartItem, removeCartItem, selectCartGuid } from './providers/cartSlice';
import { AppDispatch } from '../../stores/stores';
import { addToWishlist } from '../wishlist/WishlistSlice';
import { Product } from '../Products/products';

interface CheckoutProductProps {
  id: number;
  product_id: number;
  product_name: string;
  product_description: string;
  product_price: number;
  orginal_price: number;
  discount: number;
  image: string;
  quantity: number;
  is_selected: boolean;
  cart_guid: string;
  rating: number;
}

export const CheckoutProduct: React.FC<CheckoutProductProps> = ({
  id,
  product_id,
  product_name,
  product_description,
  product_price,
  orginal_price,
  discount,
  image,
  quantity,
  is_selected,
  cart_guid,
  rating,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isHovered, setIsHovered] = useState(false);
  const cartGuid = useSelector(selectCartGuid);


  const removeItemFromBasket = () => {
    if (cartGuid) {
      dispatch(removeCartItem({ cartGuid, productId: product_id }));
    }
  };

  const incrementQuantity = () => {
    if (cartGuid) {
      dispatch(updateCartItem({ cartGuid, productId: product_id, quantity: quantity + 1, is_selected: is_selected }));
    }
  };

  const decrementQuantity = () => {
    if (cartGuid && quantity > 1) {
      dispatch(updateCartItem({ cartGuid, productId: product_id, quantity: quantity - 1, is_selected: is_selected }));
    }
  };

  const handleSelect = () => {
    if (cartGuid) {
      dispatch(updateCartItem({ cartGuid, productId: product_id, quantity, is_selected: !is_selected }));
    }
  };

  const truncateDescription = (str: string | undefined, maxWords: number) => {
    if (!str) return '';
    const words = str.split(' ');
    return words.length <= maxWords ? str : `${words.slice(0, maxWords).join(' ')}...`;
  };

  const handleSaveLater = () => {
    const product: Product = {
      productId: product_id,
      productName: product_name,
      productDescription: product_description,
      productPrice: product_price,
      originalPrice: orginal_price,
      discount,
      image,
      reviews: 0,
      rating: 0,
      quantity: 0,
      selected: false
    };
    dispatch(addToWishlist(product));
  };

  return (
    <div
      className="bg-gray-00 sm:px-4 py-6 rounded-xl mb-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Mobile layout */}
      <div className="md:hidden">
        <div className="flex gap-3 items-start tracking-normal">
          <input type="checkbox" className='accent-green-600 size-3  self-center rounded-3xl' checked={is_selected} onChange={handleSelect} />
          <img
            src={image == ""? "https://m.media-amazon.com/images/I/61CybqpGdiL._AC_UL90_.jpg" : image}
            alt={product_name}
            className=" w-24 h-24 object-cover rounded-md "
          />

          <div className="flex flex-col justify-between ml-1 flex-grow">
            <p className="text-sm font-bold text-black">{truncateDescription(product_name, 10)}</p>
            <p className="text-sm text-gray-600">
              {truncateDescription(product_description, 6)}
            </p>
            <p className="text-lg font-bold mt-1">
              ₹{product_price}{' '}
              <span className="text-sm font-normal line-through text-gray-500">
                ₹{orginal_price}
              </span>{' '}
              <span className="text-green-600 text-sm">
                You save ₹{orginal_price - product_price}
              </span>
            </p>
            <p className="text-xs text-gray-600 mt-1">Rating: {rating.toFixed(2)}</p>
          </div>
        </div>

        <div className="flex items-start xs:gap-1 sm:gap-4 mt-4 px-6">
          <div className="flex items-center xs:space-x-3 sm:space-x-3 sm:gap-x-4">
            <button onClick={decrementQuantity} className="bg-white border   rounded-md hover:bg-gray-100 transition-colors duration-300 text-xl text-gray-500 font-bold xs:px-2 sm:px-3"
             style={{lineHeight: "1.6rem"}}>
             -
            </button>
            <span className="text-base">{quantity}</span>
            <button onClick={incrementQuantity} className="bg-white border   rounded-md hover:bg-gray-100 transition-colors duration-300 text-xl text-gray-500 font-bold xs:px-2 sm:px-3"
            style={{lineHeight: "1.6rem"}}>
              +
            </button>
          </div>
          <button onClick={removeItemFromBasket} className="bg-white text-gray-700 py-1 px-2 rounded-xl hover:underline transition-colors duration-300 xs:text-xs sm:text-sm">
            Delete
          </button>
          <button onClick={handleSaveLater} className="bg-white text-gray-700 py-1 px-2 rounded-xl hover:underline transition-colors duration-300 xs:text-xs sm:text-sm">
            Save for later
          </button>
        </div>
      </div>

      {/* Desktop layout */}
    {/* Desktop layout */}
    <div className="hidden md:block">
      <div className="flex gap-4 px-4 max-md:flex-wrap">
        <input type="checkbox" className='accent-green-600 size-4 self-start rounded-3xl' checked={is_selected} onChange={handleSelect} />
        <img
          src={image === "" ? "https://m.media-amazon.com/images/I/61CybqpGdiL._AC_UL90_.jpg" : image}
          alt={product_name}
          className="w-36 h-36 object-fill rounded-md"
        />
        <div className="flex flex-col flex-1 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-wrap">
            <div className="flex-1 py-1 text-base font-medium tracking-normal text-zinc-800 max-md:max-w-full">
              {product_name}
            </div>
            <div className="self-start py-1 text-xs tracking-normal text-right text-neutral-400">
              In stock
            </div>
          </div>
          <div className="mt-3 text-sm tracking-normal whitespace-nowrap text-ellipsis text-neutral-500 max-md:max-w-full">
            {truncateDescription(product_description, 20)}
          </div>
          <div className="flex gap-4 pr-20 mt-5 max-md:flex-wrap max-md:pr-5">
            <div className="my-auto text-xs tracking-normal text-green-700">
              You Save ₹{orginal_price - product_price}
            </div>
            <div className="flex gap-2">
              <div className="text-base font-bold tracking-normal text-zinc-800">
                ₹{product_price}
              </div>
              <div className="text-xs tracking-normal line-through text-neutral-400">
                ₹{orginal_price}
              </div>
            </div>
          </div>
          <div className="flex gap-5 justify-between mt-4 w-full max-md:flex-wrap max-md:max-w-full">
            <div className="flex gap-2 items-center">
              <div className="my-auto text-xs tracking-normal text-zinc-800">
                Qty:
              </div>
              <div className="flex items-center gap-x-2">
                <button onClick={decrementQuantity} className="bg-white border rounded-md hover:bg-gray-100 transition-colors duration-300 text-xl text-gray-500 font-bold px-3"
                style={{ lineHeight: "1.6rem" }}>
                  -
                </button>
                <span className="text-base">{quantity}</span>
                <button onClick={incrementQuantity} className="bg-white border rounded-md hover:bg-gray-100 transition-colors duration-300 text-xl text-gray-500 font-bold px-3"
                style={{ lineHeight: "1.6rem" }}>
                  +
                </button>
              </div>
            </div>
            <div className="flex gap-5 my-auto text-xs tracking-normal text-slate-400">
              <button onClick={removeItemFromBasket} className="bg-white text-anchor py-2 px-4 rounded-xl hover:underline transition-colors duration-300 text-base">
                Delete
              </button>
              <button onClick={handleSaveLater} className="bg-white text-anchor py-2 px-4 rounded-xl transition-colors duration-300 text-base hover:underline">
                Save for later
              </button>
              <button className="bg-white text-anchor py-2 px-4 rounded-xl transition-colors duration-300 text-base hover:underline">
                Add to Wishlist
              </button>
              <button className="bg-white text-anchor py-2 px-4 rounded-xl transition-colors duration-300 text-base hover:underline">
                Share
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="py-1 mt-4 text-xs tracking-norma text-zinc-800 max-md:max-w-full">
        Pledge: Challenge name
      </div>
    </div>
  </div>
);
};
