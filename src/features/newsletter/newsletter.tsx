import React from 'react';

const NewsletterSubscription = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-200">
            <div className="bg-gray-100 p-8 rounded-lg shadow-md max-w-md w-full">
                <h2 className="text-2xl font-bold mb-4">Subscribe for more</h2>
                <p className="text-gray-600 mb-6">
                    Be a part of our community by subscribing to our newsletter. Receive updates on new arrivals, sales, and more!
                </p>
                <div className="mb-4">
                    <input
                        type="email"
                        placeholder="your email address"
                        className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-700"
                    />
                </div>
                <p className="text-gray-500 text-sm mb-4">
                    By subscribing, you are agreeing to receive{' '}
                    <a href="#" className="text-blue-500 underline">
                        Privacy Policy
                    </a>{' '}
                    notifications.
                </p>
                <button className="w-full bg-green-500 text-white py-2 rounded-full font-semibold hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400">
                    Subscribe
                </button>
            </div>
        </div>
    );
};

export default NewsletterSubscription;
