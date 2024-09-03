import React, { useState } from 'react';
import { BanknotesIcon } from '@heroicons/react/24/solid';
import Paycarousel from './paycarousel';

interface PaymentFormProps {
  onSelectPaymentMethod: (method: string) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ onSelectPaymentMethod }) => {
  const [selectedMethod, setSelectedMethod] = useState<string>('');

  const handlePaymentMethodChange = (method: string) => {
    setSelectedMethod(method);
    onSelectPaymentMethod(method);
  };

  const PaymentOption: React.FC<{ value: string; icon: React.ReactNode; label: string }> = ({ value, icon, label }) => (
    <label className="flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors duration-200 hover:bg-gray-100">
      <input
        type="radio"
        name="paymentMethod"
        value={value}
        checked={selectedMethod === value}
        onChange={() => handlePaymentMethodChange(value)}
        className="form-radio text-green-600 focus:ring-green-500"
      />
      {icon}
      <span className="text-gray-700">{label}</span>
    </label>
  );

  return (
    <div className="space-y-4">
      <h3 className="text-2xl mb-4 text-green-800">Select Payment Method</h3>

      <div className="space-y-2">
        <PaymentOption 
          value="ccavenue" 
          icon={<Paycarousel />} 
          label="Secure pay with CCavenue (Debit/Credit Card, UPI, Net Banking)" 
        />
      </div>
    </div>
  );
};

export default PaymentForm;