import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { ROUTES } from '../../utils/Routes';

const NewsletterSubscription: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const navigate = useNavigate();

  const handleBackToProfile = () => {
    navigate(ROUTES.PROFILE);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://admin-api.ecoyaan.com/v1/guests/subscribe', {
        email,
      });

      if (response.status === 200) {
        setMessage('Thank you for subscribing!');
        setEmail('');
      } else {
        setMessage('Something went wrong. Please try again.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10"> {/* Increased padding to pt-16 */}
      <div className="bg-white p-10 rounded-lg shadow-md max-w-2xl w-full">
        <div className="flex items-center mb-4">
          <ArrowLeftIcon
            className="w-6 h-6 text-gray-600 cursor-pointer"
            onClick={handleBackToProfile}
          />
          <h2 className="text-2xl font-bold ml-4">Subscribe for more</h2>
        </div>
        <p className="text-gray-600 mb-6">
          Be a part of our community by subscribing to our newsletter. Receive
          updates on new arrivals, sales, and more!
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              placeholder="your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-700"
              required
            />
          </div>
          <p className="text-gray-500 text-sm mb-4 ml-4">
            By subscribing, you are agreeing to receive{' '}
            <a href={ROUTES.PRIVACY_POLICY} className="text-blue-500 underline">
              Privacy Policy
            </a>{' '}
          </p>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-full font-semibold hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            Subscribe
          </button>
        </form>
        {message && (
          <p className="text-center text-green-500 mt-4">{message}</p>
        )}
      </div>
    </div>
  );
};

export default NewsletterSubscription;
