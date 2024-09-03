import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PaymentSuccess from './PaymentSuccess';
import PaymentFailure from './PaymentFailure';
import { paymentApiService } from './paymentApiService';

const PaymentStatus: React.FC = () => {
    const [status, setStatus] = useState<string | null>(null);
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const orderId = params.get('request_id');

        if (orderId) {
            fetchOrderStatus(orderId);
        }
    }, [location]);

    const fetchOrderStatus = async (orderId: string) => {
        try {
            const paymentDetails = await paymentApiService.fetchOrderStatus(orderId);
            
            setTimeout(() => {
                setStatus(paymentDetails.orderStatus);
            }, 700);
        } catch (error) {
            console.error('Error fetching order status:', error);
            
            setTimeout(() => {
                setStatus('Error');
            }, 700);
        }
    };

    if (status === null) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-gray-100">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
            </div>
        );
    }
    if (status == 'Success') {
        localStorage.removeItem('checkoutGuid')
        localStorage.removeItem('cartGuid')
    }

    return (
        <>
        {status === 'Success' ? (
            <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-green-100 to-blue-50 p-4 mt-10">
                <div className="w-full max-w-3xl">
                    <PaymentSuccess />
                </div>
            </div>
        ) : (
            <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-red-100 to-yellow-50 p-4 mt-10">
                <div className="w-full max-w-3xl">
                    <PaymentFailure />
                </div>
            </div>
        )}
        </>
    );
};

export default PaymentStatus;
