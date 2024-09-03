import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useEffect, useState } from "react";
import ClearIcon from '@mui/icons-material/Clear';
import { CONSTANTS } from "../../../utils/constants";
import { Address } from "../../CheckoutFlow/AddressForm";
import { useAuth } from "../../../context/AuthContext";
import { addressApiService } from '../../CheckoutFlow/addressApiService';
import { useNavigate } from "react-router-dom";
import { useAddress } from '../../../context/AddressContext';
import { ROUTES } from "../../../utils/Routes";
import { getTranslatedText } from "../../../utils/stringUtils";


interface DeliveryLocProps {
  isLoading: boolean;
}

export default function DeliveryLoc({ isLoading }: DeliveryLocProps) {
  const [address, setAddress] = useState("");
  const [open, setOpen] = useState<boolean>(false);
  const [pincode, setPincode] = useState("");
  const [allAddresses, setAllAddresses] = useState<Address[]>([]);
  const { isLoggedIn, isSignup } = useAuth();
  const { defaultAddress, setDefaultAddress } = useAddress();



  useEffect(() => {
    if ((isLoggedIn || isSignup) && !isLoading) {
      fetchDefaultAddress();
    } else if (!isLoggedIn && !isSignup) {
      handleIPAddress();
    }
  }, [isLoggedIn, isSignup, isLoading]);

  useEffect(() => {
    if (defaultAddress) {
      setAddress(`${defaultAddress.name}, ${defaultAddress.city}, ${defaultAddress.pincode}`);
    }
  }, [defaultAddress]);

  const fetchDefaultAddress = async () => {
    try {
      const defaultAddr = await addressApiService.getDefaultAddress();
      setDefaultAddress(defaultAddr);
    } catch (error) {
      console.error("Error fetching default address:", error);
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
  const handleAddressSelect = async (selectedAddress: Address) => {
    try {
      await addressApiService.toggleDefaultAddress(selectedAddress.address_guid!);
      setDefaultAddress(selectedAddress);
      setAddress(`${selectedAddress.name}, ${selectedAddress.city}, ${selectedAddress.pincode}`);
      setOpen(false);
    } catch (error) {
      console.error("Error setting default address:", error);
    }
  }

  const navigate = useNavigate();

  const handleIPAddress = async () => {
    try {
      const response = await fetch(`${CONSTANTS.API_ENDPOINT}/v1/guests/ip_address`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setAddress(
        `${data.address_line ? data.address_line + ", " : ""} ${data.city}, ${data.pincode}`
      );
    } catch (error) {
      console.error("Error fetching IP address data:", error);
    }
  };

  const handleOpen = () => {
    if (isLoggedIn || isSignup) {
      fetchAllAddresses();
    }
    setOpen(!open);
  };
  const gotoLogin = () => {
    navigate(ROUTES.LOGIN)
    setOpen(false)
  }

  const handlePincodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 6 && /^\d*$/.test(value)) {
      setPincode(value);
    }
  }

  return (
    <>
      <div className="flex items-center xl:bg-transparent xs:bg-gray-100 py-2 xs:mt-4 xl:mt-0 xs:px-9 md:px-36 lg:px-48 xl:px-0 ">
        <LocationOnIcon className="text-gray-600 mr-1" />
        <div onClick={handleOpen} className="flex flex-col cursor-pointer">
          {(isLoggedIn || isSignup) && defaultAddress ? (
            <>
              <div className="flex flex-row">
                <span className="text-xs text-gray-600 px-1">Deliver to</span>
                <span className="text-gray-600 text-xs">
                  {defaultAddress.name} 
                </span>
              </div>
              <span className="text-sm text-gray-700 font-semibold">
                {defaultAddress.city} {defaultAddress.pincode}
              </span>
            </>
          ) : (
            <span className="text-sm text-gray-600"> {getTranslatedText("Update_Location")}</span>
          )}
        </div>
      </div>
      {open && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-[2000] flex items-center justify-center">
          <div className="bg-white rounded-lg xs:w-80 sm:w-[26rem] max-h-[90vh] overflow-y-auto">
            <div
              className="flex flex-col xs:px-0 gap-y-3 shadow-2xl"
              style={{
                boxShadow:
                  "rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset",
              }}
            >
              <div className="bg-gray-400 text-white font-semibold flex justify-between px-4 p-1 rounded-t-lg py-5">
                <h1 className="text-xl">Choose your location</h1>
                <ClearIcon className="cursor-pointer" onClick={() => setOpen(false)} />
              </div>

              <div className="flex flex-col items-center justify-center pt-4 pb-8">
                <div className="flex flex-col px-9 gap-y-3">
                  <p className="text-xs">Select a delivery location to see product availability and delivery options</p>
                  {(isLoggedIn || isSignup) ? (
                    <div className="max-h-60 overflow-y-auto">
                        {allAddresses.map((addr, index) => (
                          <div 
                            key={index} 
                            className={`border ${addr.address_guid === defaultAddress?.address_guid ? 'border-green-500' : 'border-gray-300'} rounded-lg p-3 mb-2 cursor-pointer text-sm hover:bg-gray-100`}
                            onClick={() => handleAddressSelect(addr)}
                          >
                            <p className="font-semibold">{addr.name}</p>
                            <p className="text-gray-800">{addr.address_line}</p>
                            <p className="text-gray-800">{addr.city}, {addr.state} {addr.pincode}</p>
                            {/* <p>{addr.phone_number}</p> */}
                            {addr.address_guid === defaultAddress?.address_guid && (
                              <p className="text-green-600 font-semibold mt-1">Default Address</p>
                            )}
                          </div>
                        ))}
                    </div>
                  ) : (
                    <button onClick={gotoLogin} className="py-2 text-sm rounded-xl text-white font-semibold bg-anchor">Sign in to see your addresses</button>
                  )}
                </div>

                <div className="flex flex-col pt-4 gap-y-4">
                  <div className="flex items-center w-full">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <p className="text-xs text-center mx-2">or enter your Pincode:</p>
                    <div className="flex-grow border-t border-gray-300"></div>
                  </div>
                  <div className="flex items-center gap-x-2">
                    <input
                      type="number"
                      value={pincode}
                      onChange={handlePincodeChange}
                      className="border border-gray-400 rounded-lg xs:w-48 md:w-60 outline-anchor text-sm p-2 px-3" />
                    <button className="text-sm shadow border border-gray-300 hover:bg-anchor hover:text-white p-2 rounded-lg xs:px-4 md:px-8">Apply</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

