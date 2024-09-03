import { LockClosedIcon } from '@heroicons/react/24/solid'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../utils/Routes';

export const CheckoutNavbar = () => {
  const navigate = useNavigate();
  return (
    <div className=' mb-4 flex justify-between '>
    <div onClick={()=>navigate(ROUTES.HOME)} className='brand-title cursor-pointer'>Ecoyaan</div>
    <div className='font-bold text-gray-500 text-3xl'>Checkout</div>
    <LockClosedIcon className='h-6 w-6 text-gray-500' />
    </div>
  )
}
