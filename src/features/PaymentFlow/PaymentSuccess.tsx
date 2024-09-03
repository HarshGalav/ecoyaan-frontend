import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';
import { paymentApiService } from './paymentApiService';
import { cartApiService } from '../cart/providers/cartApiService';

interface OrderedItem {
  product_name: string;
  quantity: number;
  product_price: number;
  image: string;
}

const PaymentSuccess = () => {
  const [status, setStatus] = useState('');
  const [trackingId, setTrackingId] = useState('');
  const [orderId, setOrderId] = useState('');
  const [orderedItems, setOrderedItems] = useState<OrderedItem[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [subtotal, setSubtotal] = useState<number>(0);
  const [shippingCost] = useState<number>(40); // Fixed shipping cost
  const [tax, setTax] = useState<number>(0);
  
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const orderId = params.get('request_id');
    const checkoutId = params.get('checkout_id');

    if (orderId) {
      setOrderId(orderId);
      fetchPaymentDetails(orderId);
    }

    if (checkoutId) {
      fetchCheckoutItems(checkoutId);
    }
  }, [location]);

  const fetchPaymentDetails = async (orderId: string) => {
    try {
      const paymentDetails = await paymentApiService.fetchOrderStatus(orderId);
      setStatus(paymentDetails.orderStatus);
      setTrackingId(paymentDetails.trackingId);
    } catch (error) {
      console.error('Error fetching payment details:', error);
      setStatus('Error');
    }
  };

  const fetchCheckoutItems = async (checkoutId: string) => {
    try {
      const items = await cartApiService.getCheckoutItems(checkoutId);
      setOrderedItems(items);
      calculateTotalAmount(items);
    } catch (error) {
      console.error('Error fetching checkout items:', error);
    }
  };

  const calculateTotalAmount = (items: OrderedItem[]) => {
    const subtotal = items.reduce((sum, item) => sum + item.product_price * item.quantity, 0);
    const tax = (subtotal + shippingCost) * 0.05;
    const total = subtotal + shippingCost + tax;
    setSubtotal(subtotal);
    setTax(tax);
    setTotalAmount(total);
  };


  return (
    <div className="flex flex-col pb-20 mx-auto w-full tracking-normal max-w-[480px] md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1280px]">
      <div className="flex flex-col p-4 md:p-6 w-full text-sm md:text-base text-white bg-green-500">
        <div className="self-start text-lg md:text-xl">Hi Vivek,</div>
        <div className="flex gap-2.5 mt-7 items-center">
          <FaCheck className="shrink-0 aspect-square w-[24px] md:w-[32px]" />
          <div className="flex-1 text-base md:text-lg">
            Thank you for shopping! Your order is confirmed!
          </div>
        </div>
      </div>
      <div className="flex flex-col p-4 md:p-6 w-full border-t bg-zinc-50 border-zinc-300">
        <div className="text-sm md:text-base text-black">Order no: {orderId}</div>
        <div className="flex gap-4 mt-4 text-xs md:text-sm text-black">
          <div>Estimated delivery:</div>
          <div>12-18 March, 2024</div>
        </div>
      </div>
      <div className="flex flex-col p-4 md:p-6 w-full border-t bg-zinc-50 border-zinc-300">
        <div className="text-sm md:text-base font-semibold text-black mb-4">Items ordered:</div>
        {orderedItems.map((item, index) => (
          <div key={index} className="flex gap-4 items-start mt-4 text-sm md:text-base pb-4">
            <div className="flex flex-1 gap-4 self-stretch rounded-xl">
              <img
                src={item.image == ""? "https://m.media-amazon.com/images/I/61CybqpGdiL._AC_UL90_.jpg" : item.image}
                className="shrink-0 self-start w-16 md:w-24 aspect-square object-cover rounded"
                alt={item.product_name}
              />
              <div className="flex flex-col flex-1">
                <div className="text-zinc-800 font-medium">{item.product_name}</div>
                <div className="mt-1 text-slate-400">
                  Sold by: <span className="text-blue-500 hover:underline cursor-pointer">Solaris</span>
                </div>
                <div className="mt-1 text-green-600">Pledge: Challenge name</div>
              </div>
            </div>
            <div className="text-right text-neutral-500">Qty: {item.quantity}</div>
            <div className="text-right font-medium">₹ {(item.product_price * item.quantity).toFixed(2)}</div>
          </div>
        ))}
      </div>
      <div className="flex flex-col justify-center p-4 md:p-6 w-full text-sm md:text-base border-t bg-zinc-50 border-zinc-300">
        <div className="flex justify-between items-center">
          <div className="text-zinc-800">Subtotal:</div>
          <div className="text-neutral-500">₹ {subtotal.toFixed(2)}</div>
        </div>
        <div className="flex justify-between items-center mt-2">
          <div className="text-zinc-800">Shipping:</div>
          <div className="text-neutral-500">₹ {shippingCost.toFixed(2)}</div>
        </div>
        <div className="flex justify-between items-center mt-2">
          <div className="text-zinc-800">Tax:</div>
          <div className="text-neutral-500">₹ {tax.toFixed(2)}</div>
        </div>
        <div className="flex justify-between items-center mt-4 font-semibold">
          <div className="text-zinc-800">Total:</div>
          <div className="text-neutral-800">₹ {totalAmount.toFixed(2)}</div>
        </div>
      </div>
      <div className="bg-white p-6 shadow-lg">
        <h2 className="text-green-800 font-bold text-xl mb-4 flex items-center">Tips for sustainability</h2>
        <ul className="list-disc list-inside text-gray-700 text-sm">
            <li>Description of the product: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ut vulputate orci.</li>
            <li>Description of the product: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ut vulputate orci.</li>
            <li>Description of the product: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ut vulputate orci.</li>
        </ul>
    </div>
    </div>
  );
}

export default PaymentSuccess