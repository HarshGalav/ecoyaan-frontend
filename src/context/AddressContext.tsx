import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Address } from '../features/CheckoutFlow/AddressForm';

interface AddressContextType {
  defaultAddress: Address | null;
  setDefaultAddress: (address: Address | null) => void;
}

const AddressContext = createContext<AddressContextType | undefined>(undefined);

export const AddressProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [defaultAddress, setDefaultAddress] = useState<Address | null>(null);

  return (
    <AddressContext.Provider value={{ defaultAddress, setDefaultAddress }}>
      {children}
    </AddressContext.Provider>
  );
};

export const useAddress = () => {
  const context = useContext(AddressContext);
  if (context === undefined) {
    throw new Error('useAddress must be used within an AddressProvider');
  }
  return context;
};