import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";
import { ROUTES } from "../../utils/Routes";

const PaymentFailure = () => {
  const [orderId, setOrderId] = useState<string | null>("");
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setOrderId(params.get("order_id"));
  }, [location]);

  return (
    <div className="bg-red-100 p-6 rounded-2xl shadow-xl">
      <div className="flex items-center mb-6">
        <div className="bg-red-500 text-white rounded-full p-3 mr-4 shadow-md">
          <FaExclamationTriangle className="w-8 h-8" />
        </div>
        <h1 className="text-red-800 text-2xl md:text-3xl font-bold leading-tight">
          Payment Issue Occurred
        </h1>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <p className="text-gray-700 mb-4">
          We encountered an issue with your payment. Order ID:{" "}
          <strong className="text-red-600">{orderId}</strong>
        </p>
        <button
          onClick={() => navigate(ROUTES.HOME)}
          className="w-full md:w-auto bg-blue-500 text-white py-3 px-6 rounded-full shadow-md hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 flex items-center justify-center space-x-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          <span>Return to Homepage</span>
        </button>
      </div>
    </div>
  );
};

export default PaymentFailure;
