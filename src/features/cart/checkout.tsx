import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectItems, selectTotal, fetchCartItems, selectCartGuid, createCheckout, clearCart } from './providers/cartSlice';
import { CheckoutProduct } from './CheckoutProduct';
import { AppDispatch, RootState } from '../../stores/stores'; 
import { useNavigate } from 'react-router-dom';
import { useAddress } from '../../context/AddressContext';
import { addressApiService } from '../CheckoutFlow/addressApiService';
import AddressForm, { Address } from '../CheckoutFlow/AddressForm';
import { useAuth } from '../../context/AuthContext';
import { cartApiService } from './providers/cartApiService';
import { ROUTES } from '../../utils/Routes';

const Checkout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const items = useSelector(selectItems);
  const total = useSelector(selectTotal);
  const status = useSelector((state: RootState) => state.cart.status);
  const error = useSelector((state: RootState) => state.cart.error);
  const cartGuid = useSelector(selectCartGuid);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const navigate = useNavigate();
  const { defaultAddress, setDefaultAddress } = useAddress();
  const [isAddressPopupOpen, setIsAddressPopupOpen] = useState(false);
  const [allAddresses, setAllAddresses] = useState<Address[]>([]);
  const [isAddressFormOpen, setIsAddressFormOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const { isLoggedIn,isSignup } = useAuth();


  useEffect(() => {
    if (status === 'idle' && cartGuid) {
      dispatch(fetchCartItems(cartGuid));
    }
    fetchDefaultAddress();
    fetchAllAddresses();
  }, [status, dispatch, cartGuid]);

  const fetchDefaultAddress = async () => {
    try {
      const address = await addressApiService.getDefaultAddress();
      setDefaultAddress(address);
    } catch (error) {
      console.error('Error fetching default address:', error);
    }
  };

  const handleProceedToCheckout = async () => {
    if (selectedItemsCount === 0) {
      alert("Please select items to checkout.");
      return;
    }
    
    try {
      setIsCheckingOut(true);
      await dispatch(createCheckout(cartGuid || ''));
      navigate(ROUTES.CONFIRM_PAYMENT);
    } catch (error) {
      console.error("Error during checkout:", error);
      // Handle the error, maybe show an alert to the user
    } finally {
      setIsCheckingOut(false);
    }
  };

  const fetchAllAddresses = async () => {
    try {
      const addresses = await addressApiService.getAllAddresses();
      setAllAddresses(addresses);
    } catch (error) {
      console.error("Error fetching all addresses:", error);
    }
  };

  const handleChangeAddress = () => {
    setIsAddressPopupOpen(true);
  };

  const handleAddressSelect = async (selectedAddress: Address) => {
    try {
      await addressApiService.toggleDefaultAddress(selectedAddress.address_guid!);
      setDefaultAddress(selectedAddress);
      setIsAddressPopupOpen(false);
    } catch (error) {
      console.error("Error setting default address:", error);
    }
  };

  const handleEditAddress = (address:Address) => {
    setEditingAddress(address);
    setIsAddressPopupOpen(false);
    setIsAddressFormOpen(true);
  };

  const handleSaveAddress = async (updatedAddress: Address) => {
    try {
      let savedAddress: Address;
      if (editingAddress && editingAddress.address_guid) {
        savedAddress = await addressApiService.updateAddress(editingAddress.address_guid, updatedAddress);
      } else {
        savedAddress = await addressApiService.createAddress(updatedAddress);
      }
      
      await fetchAllAddresses();
      setIsAddressFormOpen(false);
      setIsAddressPopupOpen(true);
      setEditingAddress(null);
      
      if (savedAddress.default_address) {
        setDefaultAddress(savedAddress);
      }
    } catch (error) {
      console.error('Error saving address:', error);
    }
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  const selectedItemsCount = items.filter(item => item.is_selected).length;

  const estimatedDeliveryDate = new Date();
  estimatedDeliveryDate.setDate(estimatedDeliveryDate.getDate() + 3); 
  const formattedDeliveryDate = estimatedDeliveryDate.toLocaleDateString('en-US', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  });

  return (
    <div className="min-h-screen bg-aliceblue">
      <div className="mx-auto py-5 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg">
          <div className="px-14 py-5 max-md:px-5">
            <h1 className="text-3xl font-bold tracking-normal text-black">
              {items.length > 0 ? "Your Cart" : "Your Cart is Empty"}
            </h1>
          </div>
          {items.length > 0 ? (
            <>
          {/* Subtotal, Delivery, and Address Section */}
          <div className="flex flex-col px-14 pt-2 pb-4 mt-4 w-full max-md:px-5 max-md:max-w-full">
            <div className="self-start text-2xl tracking-normal text-black">
              Subtotal: ₹{total.toFixed(2)}
            </div>
            <div className="flex gap-4 mt-3 text-sm tracking-normal text-gray-600 max-md:flex-wrap">
              <div>Estimated delivery:</div>
              <div className="max-md:max-w-full">{formattedDeliveryDate}</div>
            </div>
            <div className="flex justify-between items-center mt-6 max-md:flex-wrap">
              <div className="text-lg font-bold tracking-normal text-zinc-800 max-md:max-w-full">
                Delivery address:
              </div>
              <button 
                onClick={handleChangeAddress}
                className="text-sm tracking-normal text-primary hover:text-primary-dark transition-colors duration-300"
              >
                Change
              </button>
            </div>
            <div className="mt-2 text-sm tracking-normal text-zinc-800 max-md:max-w-full">
              {defaultAddress ? (
                `${defaultAddress.address_line}, ${defaultAddress.city}, ${defaultAddress.state} - ${defaultAddress.pincode}`
              ) : (
                "No default address set. Please add an address."
              )}
            </div>
          </div>
          {isAddressPopupOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-[2000] flex items-center justify-center">
          <div className="bg-white rounded-lg xs:w-80 sm:w-[26rem] max-h-[90vh] overflow-y-auto">
            <div className="flex flex-col xs:px-0 gap-y-3 shadow-2xl">
              <div className="bg-gray-400 text-white font-semibold flex justify-between px-4 p-1 rounded-t-lg py-5">
                <h1 className="text-xl">Choose your location</h1>
                <button onClick={() => setIsAddressPopupOpen(false)}>×</button>
              </div>

              <div className="flex flex-col items-center justify-center pt-4 pb-8">
                <div className="flex flex-col px-9 gap-y-3">
                  <p className="text-xs">Select a delivery location to see product availability and delivery options</p>
                  <div className="max-h-60 overflow-y-auto ">
                    {allAddresses.map((addr, index) => (
                      <div 
                        key={index} 
                        className={`border ${addr.address_guid === defaultAddress?.address_guid ? 'border-green-500' : 'border-gray-300'} rounded-lg p-3 mb-2 text-sm hover:bg-gray-100`}
                      >
                        <div className="flex justify-between items-start">
                          <div 
                            className="cursor-pointer flex-grow"
                            onClick={() => handleAddressSelect(addr)}
                          >
                            <p className="font-semibold">{addr.name}</p>
                            <p className="text-gray-800">{addr.address_line}</p>
                            <p className="text-gray-800">{addr.city}, {addr.state}</p>
                            {addr.address_guid === defaultAddress?.address_guid && (
                              <p className="text-green-600 font-semibold mt-1">Default Address</p>
                            )}
                          </div>
                          <button
                            onClick={() => handleEditAddress(addr)}
                            className="text-primary hover:text-primary-dark ml-2"
                          >
                            Edit
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isAddressFormOpen && (
        <AddressForm
          onSave={handleSaveAddress}
          initialData={editingAddress}
          isOpen={isAddressFormOpen}
          onClose={() => {
            setIsAddressFormOpen(false);
            setIsAddressPopupOpen(true);
            setEditingAddress(null);
          }}
          isFirstAddress={allAddresses.length === 0}
        />
      )}
      <div className="flex flex-col pb-6 tracking-normal">
        <div className="flex flex-col justify-center px-14 w-full text-base font-bold text-black max-md:px-5 max-md:max-w-full">
          <div className="py-2 border-b border-zinc-300 max-md:max-w-full">
            Sustainability impact with your purchase
          </div>
        </div>
        <div className="flex gap-5 justify-between self-start px-14 mt-6 text-black max-md:flex-wrap max-md:px-5">
          <div className="flex flex-col">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/22090d6eede99c507ea76bf7af88e720fe7638738bdfddb2bf4835103ba7a903?apiKey=7477b1c7ade6462aaee4507c7ff5c2c7&&apiKey=7477b1c7ade6462aaee4507c7ff5c2c7"
              className="self-center aspect-square w-[50px]"
            />
            <div className="mt-4 text-2xl font-bold text-center">₹ 150</div>
            <div className="mt-2 text-base">Saved on delivery</div>
          </div>
          <div className="flex flex-col">
            <img
              loading="lazy"
              srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/be2213fd729cba4171e4691cb5bd7fa0685dd822693d57f889417a71fd7aae7b?apiKey=7477b1c7ade6462aaee4507c7ff5c2c7&&apiKey=7477b1c7ade6462aaee4507c7ff5c2c7&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/be2213fd729cba4171e4691cb5bd7fa0685dd822693d57f889417a71fd7aae7b?apiKey=7477b1c7ade6462aaee4507c7ff5c2c7&&apiKey=7477b1c7ade6462aaee4507c7ff5c2c7&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/be2213fd729cba4171e4691cb5bd7fa0685dd822693d57f889417a71fd7aae7b?apiKey=7477b1c7ade6462aaee4507c7ff5c2c7&&apiKey=7477b1c7ade6462aaee4507c7ff5c2c7&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/be2213fd729cba4171e4691cb5bd7fa0685dd822693d57f889417a71fd7aae7b?apiKey=7477b1c7ade6462aaee4507c7ff5c2c7&&apiKey=7477b1c7ade6462aaee4507c7ff5c2c7&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/be2213fd729cba4171e4691cb5bd7fa0685dd822693d57f889417a71fd7aae7b?apiKey=7477b1c7ade6462aaee4507c7ff5c2c7&&apiKey=7477b1c7ade6462aaee4507c7ff5c2c7&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/be2213fd729cba4171e4691cb5bd7fa0685dd822693d57f889417a71fd7aae7b?apiKey=7477b1c7ade6462aaee4507c7ff5c2c7&&apiKey=7477b1c7ade6462aaee4507c7ff5c2c7&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/be2213fd729cba4171e4691cb5bd7fa0685dd822693d57f889417a71fd7aae7b?apiKey=7477b1c7ade6462aaee4507c7ff5c2c7&&apiKey=7477b1c7ade6462aaee4507c7ff5c2c7&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/be2213fd729cba4171e4691cb5bd7fa0685dd822693d57f889417a71fd7aae7b?apiKey=7477b1c7ade6462aaee4507c7ff5c2c7&&apiKey=7477b1c7ade6462aaee4507c7ff5c2c7"
              className="self-center aspect-square w-[50px]"
            />
            <div className="mt-4 text-2xl font-bold text-center">7383</div>
            <div className="mt-2 text-base">kg saved on emission</div>
          </div>
          <div className="flex flex-col">
            <img
              loading="lazy"
              srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/8f4f50f56158e6df7846f150695e04ed90b36655e40f0d987e056236357bb792?apiKey=7477b1c7ade6462aaee4507c7ff5c2c7&&apiKey=7477b1c7ade6462aaee4507c7ff5c2c7&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/8f4f50f56158e6df7846f150695e04ed90b36655e40f0d987e056236357bb792?apiKey=7477b1c7ade6462aaee4507c7ff5c2c7&&apiKey=7477b1c7ade6462aaee4507c7ff5c2c7&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/8f4f50f56158e6df7846f150695e04ed90b36655e40f0d987e056236357bb792?apiKey=7477b1c7ade6462aaee4507c7ff5c2c7&&apiKey=7477b1c7ade6462aaee4507c7ff5c2c7&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/8f4f50f56158e6df7846f150695e04ed90b36655e40f0d987e056236357bb792?apiKey=7477b1c7ade6462aaee4507c7ff5c2c7&&apiKey=7477b1c7ade6462aaee4507c7ff5c2c7&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/8f4f50f56158e6df7846f150695e04ed90b36655e40f0d987e056236357bb792?apiKey=7477b1c7ade6462aaee4507c7ff5c2c7&&apiKey=7477b1c7ade6462aaee4507c7ff5c2c7&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/8f4f50f56158e6df7846f150695e04ed90b36655e40f0d987e056236357bb792?apiKey=7477b1c7ade6462aaee4507c7ff5c2c7&&apiKey=7477b1c7ade6462aaee4507c7ff5c2c7&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/8f4f50f56158e6df7846f150695e04ed90b36655e40f0d987e056236357bb792?apiKey=7477b1c7ade6462aaee4507c7ff5c2c7&&apiKey=7477b1c7ade6462aaee4507c7ff5c2c7&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/8f4f50f56158e6df7846f150695e04ed90b36655e40f0d987e056236357bb792?apiKey=7477b1c7ade6462aaee4507c7ff5c2c7&&apiKey=7477b1c7ade6462aaee4507c7ff5c2c7"
              className="self-center aspect-square w-[50px]"
            />
            <div className="mt-4 text-2xl font-bold text-center">7383</div>
            <div className="mt-2 text-base">kg saved on plastic</div>
          </div>
          <div className="flex flex-col">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/322382eb2036ef5ae93b2da95207326cb8de8a89bbe5052394c5f3f679769235?apiKey=7477b1c7ade6462aaee4507c7ff5c2c7&&apiKey=7477b1c7ade6462aaee4507c7ff5c2c7"
              className="self-center aspect-square w-[50px]"
            />
            <div className="mt-4 text-2xl font-bold text-center">7383</div>
            <div className="mt-2 text-base">kg saved on paper</div>
          </div>
          <div className="flex flex-col">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/09308b7ffef36cf432b59f39cc864db465e53a37d86f5e58a0193a3abde3beb8?apiKey=7477b1c7ade6462aaee4507c7ff5c2c7&&apiKey=7477b1c7ade6462aaee4507c7ff5c2c7"
              className="self-center aspect-square w-[50px]"
            />
            <div className="mt-4 text-2xl font-bold text-center">7383</div>
            <div className="mt-2 text-base">ltr saved on water</div>
          </div>
        </div>
      </div>
      <div className="flex gap-2 justify-between px-14 py-4 text-base tracking-normal text-black bg-zinc-300 max-md:flex-wrap max-md:px-5">
        <div className="py-2 my-auto font-bold">List of added items</div>
      </div>

          {/* Cart Items */}
          <div className="px-14 max-md:px-5">
            <div className="divide-y divide-gray-200">
              {items.map((item) => (
                <div key={item.product_id} className="py-4">
                  <CheckoutProduct
                    product_id={item.product_id}
                    product_name={item.product_name}
                    product_description={item.product_description}
                    product_price={item.product_price}
                    orginal_price={item.orginal_price}
                    discount={item.discount}
                    image={item.image}
                    quantity={item.quantity}
                    is_selected={item.is_selected}
                    rating={item.rating} 
                    id={0} 
                    cart_guid={''}                    
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-2.5 justify-between self-stretch py-4 tracking-normal border-t border-zinc-300 text-zinc-800 max-md:flex-wrap">
          <div className="mx-4 my-auto text-base font-medium">Total items: {items.length}</div>
          <div className="px-14 text-lg font-bold">Subtotal:  ₹{total.toFixed(2)}</div>
        </div>
          {/* Proceed to Checkout Button */}
          <div className="px-14 py-4 max-md:px-5 flex justify-end items-center">
            <button 
              onClick={handleProceedToCheckout}
              disabled={selectedItemsCount === 0 || isCheckingOut}
              className={`bg-primary text-white font-bold rounded-full py-2 px-6 text-sm hover:bg-primary-dark transition-colors duration-300 ${
                selectedItemsCount === 0 || isCheckingOut ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}
            </button>
          </div>
          </>
          ):(
            <div className="px-14 py-10 text-center">
            <p className="text-xl text-gray-600">Your cart is currently empty.</p>
            <button 
              onClick={() => navigate(ROUTES.PRODUCTS)} 
              className="mt-4 bg-primary text-white font-bold rounded-full py-2 px-6 text-sm hover:bg-primary-dark transition-colors duration-300"
            >
              Continue Shopping
            </button>
          </div>
        )}
        </div>
      </div>

      {isAddressFormOpen && (
        <AddressForm
          onSave={handleSaveAddress}
          initialData={defaultAddress}
          isOpen={isAddressFormOpen}
          onClose={() => setIsAddressFormOpen(false)}
          isFirstAddress={true}
        />
      )}
    </div>
  );
};

export default Checkout;