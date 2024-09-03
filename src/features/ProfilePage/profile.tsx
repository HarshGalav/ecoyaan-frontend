import React, { useState, useEffect } from 'react';
import { getGuestData, updateGuestData, UserData } from './apiService';
import axios from 'axios';
import { CONSTANTS } from "../../utils/constants";
import { Link } from 'react-router-dom';
import { ROUTES } from '../../utils/Routes';

const getFirstLetter = (name: string | undefined): string => {
  if (!name) return '';
  return name.charAt(0).toUpperCase();
};

const isEmail = (identifier: string): boolean => {
  return identifier.includes('@');
};

const isPhoneNumber = (identifier: string): boolean => {
  return /^\d{10}$/.test(identifier);
};

const ProfilePage: React.FC = () => {
  const [userData, setUserData] = useState<UserData>({
    first_name: '',
    email: '',
    phone: { code: '', number: '' }
  });
  const [showModal, setShowModal] = useState(false);
  const [identifier, setIdentifier] = useState('');
  const [newIdentifier, setNewIdentifier] = useState('');

  const guestId = localStorage.getItem('guest_id') || '';
  const accessToken = localStorage.getItem('accessToken') || '';

  const fetchData = async () => {
    if (guestId && accessToken) {
      try {
        const data = await getGuestData(guestId, accessToken);
        setUserData(data);
        setIdentifier(localStorage.getItem('identifier') || '');
      } catch (error) {
        // Handle error if needed
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [guestId, accessToken]);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('cartGuid')
    localStorage.removeItem('checkoutGuid')
    window.location.href = ROUTES.HOME;
  };

  const handleSaveIdentifier = async () => {
    try {
      const updatedData = { ...userData };
      if (isEmail(identifier)) {
        updatedData.phone = { code: '', number: newIdentifier };
      } else if (isPhoneNumber(identifier)) {
        updatedData.email = newIdentifier;
        updatedData.phone = { code: '', number: identifier };
      }
      await updateGuestData(guestId, accessToken, updatedData);
      setShowModal(false);
      await fetchData(); // Re-fetch 
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <div className="bg-white shadow-md rounded-lg p-10 w-full max-w-5xl">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center">
            <div className="flex items-center justify-center text-xl w-12 h-12 sm:w-28 sm:h-28 bg-gray-600 rounded-full text-white font-bold sm:text-5xl cursor-pointer">
              {getFirstLetter(userData.first_name)}
            </div>
            <div className="ml-6">
              <h2 className="text-2xl font-bold">{userData.first_name}</h2>
              <p className="text-gray-600 mt-2 text-lg">{userData.email}</p>
              <p className="text-gray-600 mt-2 text-lg">{userData.phone.number}</p>
              {!userData.phone.number && (
                <a href="#" className="text-blue-500 mt-2 text-base" onClick={() => setShowModal(true)}>Add Phone Number</a>
              )}
              {!userData.email && (
                <a href="#" className="text-blue-500 mt-2 text-base" onClick={() => setShowModal(true)}>Add Email Address</a>
              )}
            </div>
          </div>
          <button 
            className="hidden sm:block py-2 px-6 border border-green-500 text-green-500 rounded-lg hover:bg-green-500 hover:text-white transition duration-200 text-base" 
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>



          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { text: 'Your Order', path: ROUTES.ORDERS },
              { text: 'Your Wishlist', path:ROUTES.SHOW_WISHLIST },
              { text: 'Your Addresses', path: ROUTES.ADDRESS_PAGE },
              { text: 'Newsletter Subscription', path: ROUTES.NEWSLETTER_SUBSCRIPTION },
              { text: 'Your Preferences', path:ROUTES.PREFERENCES  },
              { text: 'Contact Us', path: ROUTES.CONTACT_US}
            ].map(({ text, path }, index) => (
              <Link 
                key={index}
                to={path}
                style={{ textDecoration: 'none' }}
                className="flex gap-4 sm:gap-0 sm:flex-col justify-between sm:tems-center sm:justify-center py-2 px-5 sm:p-6 bg-white border border-gray-300 rounded-lg text-lg"
              >
                <div className='flex sm:flex-col gap-3'>
                <span className="text-2xl pt-2 sm:pl-0 sm:pt-0">👣</span>
                <span className="mt-2 text-gray-800 font-semibold text-start ">{text}</span>
                </div>
                <span className="text-gray-500 mt-2 ">Home</span>
              </Link>
            ))}
                      <button 
            className=" sm:hidden py-2 px-6 border border-green-500 text-green-500 rounded-lg hover:bg-green-500 hover:text-white transition duration-200 text-base" 
            onClick={handleLogout}
          >
            Logout
          </button>
          </div>

      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Add {isEmail(identifier) ? 'Phone Number' : 'Email Address'}</h2>
            <input
              type="text"
              value={newIdentifier}
              onChange={(e) => setNewIdentifier(e.target.value)}
              className="border p-2 w-full mb-4"
              placeholder={`Enter ${isEmail(identifier) ? 'Phone Number' : 'Email Address'}`}
            />
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded mr-4"
              onClick={handleSaveIdentifier}
            >
              Add
            </button>
            <button
              className="bg-gray-500 text-white py-2 px-4 rounded"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
