import React, { useEffect, useRef, useState } from 'react';
import { Address } from './AddressForm';
import { addressApiService } from './addressApiService';
import { FaSpinner } from 'react-icons/fa';

interface AddressListProps {
  addresses: Address[];
  onSelect: (guid: string, address: Address) => void;
  onEdit: (address: Address) => void;
  onDelete: (guid: string) => void;
  selectedAddressGuid: string | null;
  onAddressesUpdate: (updatedAddresses: Address[]) => void;
  newlyAddedAddressGuid: string | null;
}

const AddressList: React.FC<AddressListProps> = ({
  addresses,
  onSelect,
  onEdit,
  onDelete,
  selectedAddressGuid,
  onAddressesUpdate,
  newlyAddedAddressGuid,
}) => {
  const [expandedAddressGuid, setExpandedAddressGuid] = useState<string | null>(null);
  const [loadingAddressGuid, setLoadingAddressGuid] = useState<string | null>(null);
  const newAddressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (newlyAddedAddressGuid) {
      setExpandedAddressGuid(newlyAddedAddressGuid);
      setTimeout(() => {
        if (newAddressRef.current) {
          newAddressRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 50);
    }
  }, [newlyAddedAddressGuid]);

  const handleCardClick = (guid: string) => {
    setExpandedAddressGuid(expandedAddressGuid === guid ? null : guid);
  };

  const handleSelect = (guid: string, address: Address) => {
    onSelect(guid, address);
    setExpandedAddressGuid(null);
  };

  const handleDefaultChange = async (changedAddress: Address) => {
    try {
      setLoadingAddressGuid(changedAddress.address_guid!);
      const updatedAddress = await addressApiService.toggleDefaultAddress(changedAddress.address_guid!);
      
      const updatedAddresses = addresses.map(address => 
        address.address_guid === updatedAddress.address_guid
          ? { ...address, default_address: updatedAddress.default_address }
          : { ...address, default_address: false }
      );
  
      onAddressesUpdate(updatedAddresses);
    } catch (error) {
      console.error('Error toggling default address:', error);
    } finally {
      setLoadingAddressGuid(null);
    }
  };

  return (
    <div className="max-h-[60vh] overflow-y-auto pr-4 space-y-4 scrollbar-thin scrollbar-thumb-green-500 scrollbar-track-gray-200">
      {addresses.map((address) => (
        <div
          key={address.address_guid}
          ref={address.address_guid === newlyAddedAddressGuid ? newAddressRef : null}
          className={`p-6 bg-gray-50 rounded-lg shadow-md transform transition duration-300 ease-in-out hover:scale-102 hover:shadow-lg cursor-pointer ${
            selectedAddressGuid === address.address_guid ? 'border-2 border-primary' : 'border border-gray-200'
          }`}
          onClick={() => handleCardClick(address.address_guid!)}
        >
          <div className="flex items-start ">
            <div className="flex-grow ">
              <h3 className="text-xl font-semibold text-green-700 mb-2">{address.name}</h3>
              <p className="text-gray-700 mt-2 text-left "><strong>Address:</strong> {address.address_line}</p>
              <p className="text-gray-600 text-left">{address.city}, {address.state} - {address.pincode}</p>
            </div>
          </div>
          <div className="flex items-center">
              {loadingAddressGuid === address.address_guid ? (
                <FaSpinner className="animate-spin text-green-500 mr-2" />
              ) : (
                <input
                  type="checkbox"
                  checked={address.default_address}
                  onChange={() => handleDefaultChange(address)}
                  onClick={(e) => e.stopPropagation()}
                  className="mr-2"
                />
              )}
              <label className="text-sm font-medium text-green-700">Mark as default address</label>
            </div>
          {expandedAddressGuid === address.address_guid && (
            <div className="mt-4 space-y-3 px-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelect(address.address_guid!, address);
                }}
                className="bg-transparent text-green-600 p-2 rounded-xl w-full border border-green-600 transition duration-300 ease-in-out hover:bg-green-600 hover:text-white"
              >
              Deliver Here
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(address);
                }}
                className="bg-transparent text-green-600 p-2 rounded-xl w-full border border-green-600 transition duration-300 ease-in-out hover:bg-green-600 hover:text-white"
              >
                Edit Address
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(address.address_guid!);
                }}
                className="bg-transparent text-red-600 p-2 rounded-xl w-full border border-red-600 transition duration-300 ease-in-out hover:bg-red-600 hover:text-white"
              >
                Delete Address
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AddressList;