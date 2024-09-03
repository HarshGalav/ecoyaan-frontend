import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCheckoutItems, selectCheckoutItems, selectCheckoutGuid, CheckoutItem } from '../cart/providers/cartSlice';
import { AppDispatch, RootState } from '../../stores/stores'; // Adjust the import path as needed
import { setCheckoutGuid } from '../cart/providers/cartSlice';


const OrderSummary: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const checkoutItems = useSelector(selectCheckoutItems);
  const checkoutGuid = useSelector(selectCheckoutGuid);
  const status = useSelector((state: RootState) => state.cart.status);
  const error = useSelector((state: RootState) => state.cart.error);
  
  useEffect(() => {
    const storedCheckoutGuid = localStorage.getItem('checkoutGuid');
    if (storedCheckoutGuid && storedCheckoutGuid !== checkoutGuid) {
      dispatch(setCheckoutGuid(storedCheckoutGuid));
    }
    if (storedCheckoutGuid) {
      dispatch(getCheckoutItems(storedCheckoutGuid));
    }
  }, [dispatch, checkoutGuid]);

  if (error) return <div>Error: {error}</div>;
  if (!checkoutItems || checkoutItems.length === 0) return <div>No items in checkout</div>;

  const subtotal = checkoutItems.reduce((sum, item) => sum + item.product_price * item.quantity, 0);
  const shipping = 40;
  const total = subtotal + shipping;
  const tax = total * 0.05;

  return (
    <div className="bg-white p-4 xs:w-full lg:w-[28vw] rounded-xl shadow-lg border border-gray-200 group">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Order Summary</h2>
      <div className="max-h-60 overflow-y-auto mb-6 pr-2 scrollbar-thin scrollbar-thumb-transparent scrollbar-track-transparent group-hover:scrollbar-thumb-gray-300">
        {checkoutItems.map((item: CheckoutItem) => (
          <div key={item.product_id} className="flex items-center mb-6 last:mb-0">
            <img src={item.image} alt={item.product_name} className="w-24 h-24 object-cover rounded-lg mr-4 shadow-md" />
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{item.product_name}</h3>
              <p className="text-gray-600 font-medium">₹{item.product_price.toFixed(2)} x {item.quantity}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="space-y-3 border-t border-gray-200 pt-4">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span className="font-medium">₹{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          <span className="font-medium">₹{shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Taxes (5% GST)</span>
          <span className="font-medium">₹{tax.toFixed(2)}</span>
        </div>
      </div>
      <div className="flex justify-between text-xl font-bold mt-6 border-t border-gray-200 pt-4">
        <span>Total</span>
        <span className="text-green-600">₹{total.toFixed(2)}</span>
      </div>
      <p className="text-gray-500 text-sm mt-2">
        Including ₹{tax.toFixed(2)} in taxes
      </p>
    </div>
  );
};

export default OrderSummary;