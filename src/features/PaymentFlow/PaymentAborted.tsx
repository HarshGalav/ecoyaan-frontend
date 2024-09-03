import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";

const PaymentAborted: React.FC = () => {
  const [requestId, setRequestId] = useState<string | null>("");
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setRequestId(params.get("request_id"));
  }, [location]);

  return (
    <div className="bg-red-100 p-4 rounded-lg">
      <div className="flex items-center mb-4">
        <div className="bg-red-500 text-white rounded-full p-2 mr-2">
          <FaExclamationTriangle className="w-6 h-6" />
        </div>
        <h1 className="text-red-800 text-xl font-semibold">
          Payment Cancelled
        </h1>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <p className="text-gray-700">Payment Cancelled by the user</p>
        <br></br>
        <p>
          {" "}
          Order ID: <strong>{requestId}</strong>
        </p>
      </div>
    </div>
  );
};

export default PaymentAborted;
