import { useEffect, useState } from "react";
import { LuPencil } from "react-icons/lu";
import { HiOutlineTrash } from "react-icons/hi2";
import AddressForm, { Address } from '../CheckoutFlow/AddressForm';
import { addressApiService } from '../CheckoutFlow/addressApiService';
import { useAddress } from "../../context/AddressContext";
import { IoMdClose } from "react-icons/io";
import { ArrowLeftIcon } from '@heroicons/react/24/solid'; // Import the back arrow icon
import { useNavigate } from 'react-router-dom';
import { ROUTES } from "../../utils/Routes";

export default function AddressPage() {
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingAddress, setEditingAddress] = useState<Address | null>(null);
    const { defaultAddress, setDefaultAddress } = useAddress();
    const [open, setOpen] = useState(false);
    const [isFirstAddress, setIsFirstAddress] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchAddresses();
    }, []);

    const fetchAddresses = async () => {
        try {
            const fetchedAddresses = await addressApiService.getAllAddresses();
            setIsFirstAddress(fetchedAddresses.length === 0);
            setAddresses(fetchedAddresses);
            const defaultAddr = fetchedAddresses.find((addr: { default_address: any; }) => addr.default_address);
            if (defaultAddr) {
                setDefaultAddress(defaultAddr);
            }
        } catch (error) {
            console.error('Error fetching addresses:', error);
        }
    };

    const handleAddNewAddress = () => {
        setEditingAddress(null);
        setIsFormOpen(true);
        setOpen(true);
    };

    const handleEditAddress = (address: Address) => {
        setEditingAddress(address);
        setIsFormOpen(true);
        setOpen(true);
    };

    const handleRemoveAddress = async (addressGuid: string) => {
        try {
            await addressApiService.deleteAddress(addressGuid);
            fetchAddresses();
        } catch (error) {
            console.error('Error removing address:', error);
        }
    };

    const handleSetDefaultAddress = async (address: Address) => {
        try {
            await addressApiService.toggleDefaultAddress(address.address_guid!);
            setDefaultAddress(address);
            setAddresses(prevAddresses => 
                prevAddresses.map(addr => ({
                    ...addr,
                    default_address: addr.address_guid === address.address_guid
                }))
            );
        } catch (error) {
            console.error('Error setting default address:', error);
        }
    };

    const handleSaveAddress = async (address: Address) => {
        try {
            if (editingAddress) {
                await addressApiService.updateAddress(editingAddress.address_guid!, address);
            } else {
                await addressApiService.createAddress(address);
            }
            if (isFirstAddress) {
              setIsFirstAddress(false);
            }
            setIsFormOpen(false);
            setOpen(false);
            fetchAddresses(); // Refresh the list after saving
        } catch (error) {
            console.error('Error saving address:', error);
        }
    };

    const handleBackToProfile = () => {
        navigate(ROUTES.PROFILE); // Navigate to the profile page
    };

    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <div className="bg-white shadow-md rounded-lg p-10 w-full max-w-5xl relative">
          <div className="flex items-center justify-start">
              <ArrowLeftIcon
                  className="w-6 h-6 text-gray-600 cursor-pointer"
                  onClick={handleBackToProfile}
              />
              <div className="flex flex-wrap justify-between items-center w-full ml-7">
                  <h1 className="text-3xl font-bold text-black">Your Addresses</h1>
                  <button 
                      onClick={handleAddNewAddress}
                      className="text-base text-anchor hover:text-anchor-hover border border-dashed border-anchor rounded-xl p-2 font-bold hover:bg-anchor/10"
                  >
                      + Add New Address
                  </button>
              </div>
          </div>
          
          <div className="flex flex-col pb-6 px-4 md:px-8 lg:px-16 mt-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {addresses.map((address) => (
                      <div key={address.address_guid} className="flex flex-col p-6 bg-white rounded-3xl border border-slate-400">
                          <div className="flex justify-between items-center mb-4">
                              <span className="text-2xl font-bold text-black">{address.name}</span>
                              {address.default_address ? (
                                  <span className="text-xl text-neutral-500">Default</span>
                              ) : (
                                  <button 
                                      onClick={() => handleSetDefaultAddress(address)}
                                      className="text-xl text-anchor hover:text-anchor-hover"
                                  >
                                      Set as default
                                  </button>
                              )}
                          </div>
                          <p className="text-xl text-zinc-800 mb-4">
                              {address.address_line}, {address.city}, {address.state} - {address.pincode}
                          </p>
                          <p className="text-xl font-medium text-zinc-800 mb-6">{address.phone_number}</p>
                          <div className="flex gap-4 self-end">
                              <button 
                                  onClick={() => handleEditAddress(address)}
                                  className="flex items-center px-4 py-2 border rounded-full border-slate-500 text-neutral-500 hover:bg-slate-100"
                              >
                                  <LuPencil className="w-4 h-4 mr-2" />
                                  Edit
                              </button>
                              <button 
                                  onClick={() => handleRemoveAddress(address.address_guid!)}
                                  className="flex items-center px-4 py-2 border rounded-full border-slate-500 text-neutral-500 hover:bg-slate-100"
                              >
                                  <HiOutlineTrash className="w-4 h-4 mr-2" />
                                  Remove
                              </button>
                          </div>
                      </div>
                  ))}
              </div>
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
                          <h1 className="text-xl">Address Form</h1>
                          <IoMdClose className="cursor-pointer" onClick={() => { setOpen(false); setIsFormOpen(false); }} />
                      </div>
                      <div className="flex flex-col items-center justify-center pt-4 pb-8">
                          <AddressForm
                              onClose={() => { setOpen(false); setIsFormOpen(false); }}
                              isOpen={isFormOpen}
                              onSave={handleSaveAddress}
                              initialData={editingAddress}
                              isFirstAddress={isFirstAddress}
                          />
                      </div>
                  </div>
              </div>
          </div>
      )}
  </div>
    );
}
