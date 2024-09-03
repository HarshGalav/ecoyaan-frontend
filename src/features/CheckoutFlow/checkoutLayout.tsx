import { Outlet } from 'react-router-dom';
import { CheckoutNavbar } from './CheckoutNavbar';

function CheckoutLayout() {

  return (
    <div className=" mt-full mb-full w-full h-full p-8 bg-color overflow-x-hidden bg-gradient-to-br from-blue-50 to-green-100">
        <CheckoutNavbar />
        <main>
      <Outlet />
      </main>
    </div>
  );
}

export default CheckoutLayout;
