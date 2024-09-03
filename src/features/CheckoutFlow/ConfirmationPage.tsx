import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaSpinner, FaTimes } from 'react-icons/fa';
import {
  Modal as SemanticModal,
  ModalHeader,
  ModalContent,
  ModalDescription,
  Dimmer,
  Loader,
} from 'semantic-ui-react';
import AddressForm from './AddressForm';
import AddressList from './AddressList';
import { Address } from './AddressForm';
import { paymentApiService, PaymentData } from '../PaymentFlow/paymentApiService';
import OrderSummary from './OrderSummary';
import PaymentForm from './payform';
import { useDispatch, useSelector } from 'react-redux';
import { selectCheckoutGuid, getCheckoutItems, selectCheckoutItems } from '../cart/providers/cartSlice';
import { AppDispatch } from '../../stores/stores';
import { addressApiService } from './addressApiService';
import { selectCartGuid } from '../cart/providers/cartSlice';
import { useAddress } from '../../context/AddressContext';
import { useAuth } from '../../context/AuthContext';
import { ROUTES } from '../../utils/Routes';

const ConfirmationPage: React.FC = () => {
  const location = useLocation();
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressGuid, setSelectedAddressGuid] = useState<string | null>(null);
  const cart_guid = useSelector(selectCartGuid)
  const { setDefaultAddress } = useAddress();
    const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });
  const [encReqURL, setEncReqURL] = useState("");
  const [hasIFrameLoaded, setHasIFrameLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [open, setOpen] = useState(false);
  const [expandedStep, setExpandedStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const checkoutGuid = useSelector(selectCheckoutGuid);
  const dispatch = useDispatch<AppDispatch>();
  const checkoutItems = useSelector(selectCheckoutItems);
  const [isaddrLoading, setIsaddrLoading] = useState(false);
  const {isLoggedIn} = useAuth();
  const navigate = useNavigate();
  const [isFirstAddress, setIsFirstAddress] = useState(true);
  const [newlyAddedAddressGuid, setNewlyAddedAddressGuid] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoggedIn) {
      localStorage.setItem('loginForCheckout', 'true');
      navigate(ROUTES.LOGIN);
    }
  }, [isLoggedIn, navigate]);


  

/* AddressPart */
useEffect(() => {
  fetchAddresses();
  fetchDefaultAddress();
}, []);

useEffect(() => {
  if (isModalOpen || open) {
    document.body.style.position = 'fixed';
    document.body.style.width = '100%'; 
  } else {
    document.body.style.position = '';
    document.body.style.width = '';
  }
  return () => {
    document.body.style.position = '';
    document.body.style.width = '';
  };
}, [isModalOpen, open]);

useEffect(() => {
  document.body.style.overflow = isModalOpen || open ? 'hidden' : 'auto';
  return () => {
    document.body.style.overflow = 'auto';
  };
}, [isModalOpen, open]);


const fetchAddresses = async () => {
  setIsaddrLoading(true);
  try {
    const fetchedAddresses = await addressApiService.getAllAddresses();
    setAddresses(fetchedAddresses);
    setIsFirstAddress(fetchedAddresses.length === 0);
  } catch (error) {
    console.error('Error fetching addresses:', error);
  } finally {
    setIsaddrLoading(false);
  }
};
const fetchDefaultAddress = async () => {
  try {
    const defaultAddress = await addressApiService.getDefaultAddress();
    if (defaultAddress) {
      handleSelectAddress(defaultAddress.address_guid, defaultAddress);
    }
  } catch (error) {
    console.error('Error fetching default address:', error);
  }
};

const handleAddNewAddress = () => {
  setIsModalOpen(false);
  setIsAddingAddress(true);
  setEditingAddress(null);
  setOpen(true);
};

const handleSaveAddress = async (address: Address) => {
  try {
    setIsaddrLoading(true);
    let updatedAddress;
    if (editingAddress && editingAddress.address_guid) {
      updatedAddress = await addressApiService.updateAddress(editingAddress.address_guid, address);
    } else {
      updatedAddress = await addressApiService.createAddress({...address, default_address: isFirstAddress});
    }
    
    setAddresses(prevAddresses => {
      let newAddresses;
      if (editingAddress && editingAddress.address_guid) {
        newAddresses = prevAddresses.map(addr => 
          addr.address_guid === updatedAddress.address_guid ? updatedAddress : addr
        );
      } else {
        newAddresses = [...prevAddresses, updatedAddress];
      }

      if (updatedAddress.default_address) {
        newAddresses = newAddresses.map(addr => 
          addr.address_guid === updatedAddress.address_guid
            ? addr
            : { ...addr, default_address: false }
        );
        setDefaultAddress(updatedAddress);
      }

      return newAddresses;
    });

    setIsAddingAddress(false);
    setEditingAddress(null);
    setOpen(false);

    setNewlyAddedAddressGuid(updatedAddress.address_guid);
    setSelectedAddressGuid(updatedAddress.address_guid);

    if (isFirstAddress) {
      setCompletedSteps([1]);
      setExpandedStep(2);
      setIsFirstAddress(false);
    }

    fetchAddresses();

  } catch (error) {
    console.error('Error saving address:', error);
  } finally {
    setIsaddrLoading(false);
  }
};

const handleEditAddress = (address: Address) => {
  setEditingAddress({...address, address_guid: address.address_guid});
  setIsAddingAddress(false);
  setOpen(true);
};

const handleDeleteAddress = async (guid: string) => {
  try {
    setIsaddrLoading(true);
    await addressApiService.deleteAddress(guid);
    fetchAddresses();
  } catch (error) {
    console.error('Error deleting address:', error);
  }
  finally {
    setIsaddrLoading(false);
  }
};

const handleSelectAddress = (guid: string, address: Address) => {
  setFormData({
    name: address.name,
    email: address.email,
    phoneNumber: address.phone_number,
    address: address.address_line,
    city: address.city,
    state: address.state,
    pincode: address.pincode,
  });
  setSelectedAddressGuid(guid);
  setCompletedSteps([...completedSteps, 1]);
  setExpandedStep(2);
};
const handleAddressesUpdate = (updatedAddresses: Address[]) => {
  setAddresses(updatedAddresses);
};

  /* PaymentPart */

  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    if (checkoutGuid) {
      dispatch(getCheckoutItems(checkoutGuid));
    }
  }, [checkoutGuid,dispatch]);

  useEffect(() => {
    calculateTotalAmount();
  }, [checkoutItems]);

  const calculateTotalAmount = () => {
    const subtotal = checkoutItems.reduce((sum, item) => sum + item.product_price * item.quantity, 0);
    const shippingCost = 40; 
    const tax = (subtotal + shippingCost) * 0.05;
    const total = subtotal + shippingCost + tax;
    setTotalAmount(total);
  };

  const handlePaymentMethodChange = (method: string) => {
    setPaymentMethod(method);
  }

  const handleClosePaymentModal = () => {
    setIsModalOpen(false);
    
  };

  const handleConfirmPayment = async () => {
    try {
      const selectedAddress = addresses.find(addr => addr.address_guid === selectedAddressGuid);
      if (!selectedAddress) {
        console.error('Selected address is missing');
        return;
      }
  
      if (!checkoutGuid) {
        console.error('Checkout GUID is missing');
        return;
      }
  
      const paymentData: PaymentData = {
        checkout_guid: checkoutGuid,
        total_amount: totalAmount.toFixed(2),
        address: selectedAddress.address_line,
        name: selectedAddress.name,
        email: selectedAddress.email,
        pincode: selectedAddress.pincode,
        city: selectedAddress.city,
        phone_number: selectedAddress.phone_number,
        state: selectedAddress.state,
        additional_parameters: {
          additionalProp2: cart_guid
        }
      };
  
      const response = await paymentApiService.initiatePayment(paymentData);
  
      if (response && response.paymentUrl) {
        setEncReqURL(response.paymentUrl);
        setHasIFrameLoaded(false);
        setIsModalOpen(true);
      } else {
        console.error('Unexpected response format:', response);
      }
    } catch (error) {
      console.error('Error initiating payment:', error);
    }
  };

  const toggleStep = (step: number) => {
    if (step === 1 || completedSteps.includes(step - 1)) {
      setExpandedStep(expandedStep === step ? 0 : step);
    }
  };

  

  const renderStepContent = (step: number) => {
    switch (step) {
      case 1:
        return (
          <div className="transition-all duration-300 ease-in-out">
            {isaddrLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50">
          <FaSpinner className="animate-spin text-green-500 text-4xl" />
        </div>
            )}
              <>
                <div className="mb-4">
                  <button onClick={handleAddNewAddress} className="bg-primary mt-4 hover:bg-green-600 text-white p-2 px-3 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Add New Address
                  </button>
                </div>
                <AddressList
                  addresses={addresses}
                  onSelect={handleSelectAddress}
                  onEdit={handleEditAddress}
                  onDelete={handleDeleteAddress}
                  selectedAddressGuid={selectedAddressGuid}
                  onAddressesUpdate={handleAddressesUpdate}
                  newlyAddedAddressGuid={newlyAddedAddressGuid}
                />
              </>
            
          </div>
        );
      case 2:
        return (
          <div className="transition-all duration-300 ease-in-out">
            <PaymentForm onSelectPaymentMethod={handlePaymentMethodChange} />
            <button
              onClick={() => {
                setCompletedSteps([...completedSteps, 2]);
                setExpandedStep(3);
              }}
              className="mt-4 bg-primary hover:bg-green-700 text-white p-1 px-5 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-md"
            >
              Continue
            </button>
          </div>
        );
      case 3:
        const selectedAddress = addresses.find(addr => addr.address_guid === selectedAddressGuid);
        return (
          <div className="transition-all duration-300 ease-in-out">
            {selectedAddress && (
              <div className="mb-4">
                <h4 className="text-lg font-semibold mb-2">Delivering to:</h4>
                <p>
                  {selectedAddress.name}<br />
                  {selectedAddress.address_line}<br />
                  {selectedAddress.city}, {selectedAddress.state} {selectedAddress.pincode}<br />
                  {selectedAddress.phone_number}
                </p>
              </div>
            )}
            {paymentMethod && (
              <div className="mb-4">
                <h4 className="text-lg font-semibold mb-2">Payment Method:</h4>
                <p>{paymentMethod === 'ccavenue' ? 'Secure pay with CCavenue' : 'Cash on Delivery'}</p>
              </div>
            )}
            <button
              onClick={handleConfirmPayment}
              className="mt-4 bg-primary hover:bg-green-700 text-white p-2 px-5 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-md flex items-center mx-auto"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Proceed to Payment
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  const renderSelectedAddressDetails = () => {
    const selectedAddress = addresses.find(addr => addr.address_guid === selectedAddressGuid);
    if (selectedAddress) {
      return (
        <div className="bg-gray-100 p-3 rounded-lg mt-2">
          <div className='flex justify-between'>
            <h2 className="text-lg gap-y-4">Delivery Address: </h2>
            <p> <strong>{selectedAddress.name}</strong><br /> {selectedAddress.address_line} <br /> {selectedAddress.city},
              {selectedAddress.state} {selectedAddress.pincode} <br /> {selectedAddress.phone_number}</p>
            <button 
              onClick={() => {
                toggleStep(1);
              }} 
              className="text-primary hover:text-green-800 focus:outline-none"
            >
              Change
            </button>
          </div>
        </div>
      );
    }
    return null;
  };
  

  return (
    <div className="p-4 flex flex-col items-center justify-start min-h-screen" style={{background: "aliceblue"}}>
      <div className="max-w-[90rem] rounded-2xl xs:p-3 lg:p-7 py-11 justify-center gap-y-7 flex flex-col gap-x-5 lg:flex-row mt-9">
        <div className="w-full lg:shadow-lg lg:w-3/4">
          {[1, 2, 3].map((step) => (
            <div key={step} className="mb-4">
              <button
                onClick={() => isLoggedIn && toggleStep(step)}
                className={`w-full text-left p-4 rounded-lg shadow-md transition-all duration-300 ease-in-out ${
                  expandedStep === step && isLoggedIn ? 'bg-primary text-white' : 'bg-white text-green-800 hover:bg-green-100'
                } ${!isLoggedIn || (!completedSteps.includes(step - 1) && step !== 1) ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={!isLoggedIn || (!completedSteps.includes(step - 1) && step !== 1)}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xl font-semibold">
                    {step === 1 ? 'Shipping Address' : step === 2 ? 'Payment' : 'Review Items and Delivery'}
                  </span>
                  <svg
                    className={`w-6 h-6 transition-transform duration-300 ${
                      expandedStep === step ? 'transform rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              {step === 1 && selectedAddressGuid && expandedStep !== 1 && isLoggedIn && renderSelectedAddressDetails()}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  expandedStep === step ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-4 bg-white rounded-b-lg shadow-md">
                  {renderStepContent(step)}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div>
          <OrderSummary />
        </div>
      </div>

      {/* Address Form Modal */}
     
      <div>
        <SemanticModal
        open={open}
        closeOnDimmerClick={false}
       
        style={{ zIndex: 1000 }}
        className='absolute xs:top-40 md:top-48 rounded-2xl md:left-[13%] 2xl:left-[28%] sm:left-[18%] xs:left-[10%] lg:left-[16%] xl:left-[20%] 2xl:w-[45vw] xl:w-[64vw] md:w-[72vw] sm:w-[65vw] xs:w-[79vw] bg-white '

      >
        
        <ModalHeader>
          {/* <div className="flex justify-between items-center border">
            <button onClick={() => setOpen(false)} className="text-gray-500 hover:text-gray-700 focus:outline-none">
              <FaTimes className="h-6 w-6" />
            </button>
          </div> */}
        </ModalHeader>
        <ModalContent scrolling>
          
          <ModalDescription>
          <AddressForm 
            onClose={() => setOpen(false)} 
            isOpen={open} 
            onSave={handleSaveAddress} 
            initialData={editingAddress}
            isFirstAddress={isFirstAddress}
          />
          </ModalDescription>
        </ModalContent>
      </SemanticModal>
      </div>

      {/* Payment IFrame Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50  z-40" style={{
          zIndex: 3000}} />
      )}
      <SemanticModal
        open={isModalOpen}
        onClose={handleClosePaymentModal}
        centered={false}
        size="large"
        dimmer="blurring"
        style={{
          zIndex: 3000,
          transition: 'opacity 0.3s ease-in-out',
          opacity: isModalOpen ? 1 : 0,
          backgroundColor: isModalOpen ? 'transparent' : 'transparent'
        }}
        className={`absolute xs:top-40 md:top-48 rounded-2xl md:left-[13%] 2xl:left-[28%] sm:left-[18%] xs:left-[10%] lg:left-[16%] xl:left-[20%] 2xl:w-[45vw] xl:w-[64vw] md:w-[72vw] sm:w-[65vw] xs:w-[79vw] ${isModalOpen ? 'bg-transparent' : 'bg-transparent'}`}
      >
        <ModalContent>
          {!hasIFrameLoaded && (
            <Dimmer active inverted>
              <Loader size="massive">Loading</Loader>
            </Dimmer>
          )}
          <iframe
            title="ccavenue"
            onLoad={() => setHasIFrameLoaded(true)}
            className={`w-full transition-all duration-500 ${hasIFrameLoaded ? 'h-[555px]' : 'h-0'} border-none`}
            scrolling="no"
            src={encReqURL}
            style={{ overflow: 'hidden' }}
          />
        </ModalContent>
      </SemanticModal>
     
    </div>
  );
};

export default ConfirmationPage;
