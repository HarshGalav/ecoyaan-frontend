import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

export interface Address {
  name: string;
  email: string;
  phone_number: string; 
  address_line: string; 
  city: string;
  state: string;
  pincode: string;
  address_guid?: string;
  default_address?: boolean;
}

interface AddressFormProps {
  onSave: (address: Address) => void;
  initialData?: Address | null;
  isOpen: boolean;
  onClose: () => void;
  isFirstAddress: boolean;
}

const AddressForm: React.FC<AddressFormProps> = ({ onSave, initialData ,isOpen, onClose,isFirstAddress }) => {
  const [formData, setFormData] = useState<Address>(
    initialData || {
      name: '',
      email: '',
      phone_number: '',
      address_line: '',
      city: '',
      state: '',
      pincode: '',
      default_address: isFirstAddress
    }
  );
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      onSave(formData);
      setFormData({
        name: '',
        email: '',
        phone_number: '',
        address_line: '',
        city: '',
        state: '',
        pincode: '',
        default_address: false
      });
    } catch (error) {
      console.error('Error saving address:', error);
    }
  };

  if (!isOpen) return null;


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800  bg-opacity-50">
      <div className=" rounded-2xl p-4 shadow-lg w-full max-w-3xl mx-2 relative z-10">
        
    <form onSubmit={handleSubmit} className="bg-gray-50 p-4 px-7 rounded-2xl shadow-md border-2 space-y-3 m-0 w-full ">
      <h2 className="text-2xl font-semibold text-green-800 pb-5">
        {initialData?.address_guid ? 'Edit Address' : 'Add New Address'}
      </h2>  
      <div style={{zIndex: "2000"}} className="flex justify-between absolute top-7 right-11 border items-center "
          >
            <button onClick={onClose} className="text-gray-500 hover:text-gray-800 focus:outline-none">
              <CloseIcon className="h-6 w-6" />
            </button>
          </div>    
    <div className="grid xs:gap-4 md:gap-5 md:grid-cols-2">
        <div className='flex flex-col xs:gap-y-1 md:gap-y-2'>
          <label className="block text-sm font-medium text-green-700 mb-1">Name:</label>
          <div className="relative">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-1 pl-5 bg-white border border-gray-300 xs:text-sm md:text-base rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-300 ease-in-out "
            />
          </div>
        </div>
        <div className='flex flex-col xs:gap-y-1 md:gap-y-2'>
          <label className="block text-sm font-medium text-green-700 mb-1">Email:</label>
          <div className="relative">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-1 xs:text-sm md:text-base pl-5 bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-300 ease-in-out"
            />
          </div>
        </div>
        <div className='flex flex-col xs:gap-y-1 md:gap-y-2'>
          <label className="block text-sm font-medium text-green-700 mb-1">Phone Number:</label>
          <div className="relative">
            <input
              type="text"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              required
              className="w-full p-1 xs:text-sm md:text-base pl-5 bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-300 ease-in-out"
            />
          </div>
        </div>
        <div className='flex flex-col xs:gap-y-1 md:gap-y-2'>
          <label className="block text-sm font-medium text-green-700 mb-1">Address:</label>
          <div className="relative">
            <input
              type="text"
              name="address_line"
              value={formData.address_line}
              onChange={handleChange}
              required
              className="w-full p-1 xs:text-sm md:text-base pl-5 bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-300 ease-in-out"
            />
          </div>
        </div>
        <div className='flex flex-col xs:gap-y-1 md:gap-y-2'>
          <label className="block text-sm font-medium text-green-700 mb-1">City:</label>
          <div className="relative">
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className="w-full p-1 xs:text-sm md:text-base pl-5 bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-300 ease-in-out"
            />
          </div>
        </div>
        <div className='flex flex-col xs:gap-y-1 md:gap-y-2'>
          <label className="block text-sm font-medium text-green-700 mb-1">State:</label>
          <div className="relative">
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
              className="w-full p-1 xs:text-sm md:text-base pl-5 bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-300 ease-in-out"
            />
          </div>
        </div>
        <div className='flex flex-col xs:gap-y-1 md:gap-y-2'>
          <label className="block text-sm font-medium text-green-700 mb-1">Pincode:</label>
          <div className="relative">
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              required
              className="w-full p-1 xs:text-sm md:text-base pl-5 bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-300 ease-in-out"
            />
          </div>
        </div>
      </div>
      <div className="flex items-center ">
        <input
          type="checkbox"
          id="default"
          name="default"
          checked={formData.default_address}
          onChange={(e) => setFormData({ ...formData, default_address: e.target.checked })}
          className="mr-2"
        />
        <label htmlFor="default" className="text-sm font-medium text-green-700">
          Mark as default address
        </label>
      </div>
      <div className='pt-7 px-4'>
      <button
        type="submit"
        className="w-full px-6 py-2 rounded-full font-semibold transition duration-300 text-green-700 hover:bg-primary border-2 hover:text-white hover:scale-105 xs:text-sm md:text-lg focus:outline-none border-green-400"
      >
        <span className="flex items-center justify-center">
          {initialData?.address_guid ? 'Update Address' : 'Save Address'}
        </span>
      </button>
      </div>
    </form>
    </div>
    </div>
  );
};

export default AddressForm;