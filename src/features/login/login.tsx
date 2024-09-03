import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "./Forms";
import CustomAlert from "../../components/ui/CustomAlert";
import { Helmet } from 'react-helmet-async';
import { FaArrowLeft } from 'react-icons/fa';  
import logo from '/images/logo512.png'; 
import { ROUTES } from "../../utils/Routes";
function Login() {
  const navigate = useNavigate();
  const [hideElements, setHideElements] = useState(false);

  const handleSignUpRedirect = () => {
    navigate(ROUTES.SIGNUP);
  };

  const handleContinue = () => {
    setHideElements(true);
  };

  return (
    <>
      <Helmet>
        <title>Log in | Ecoyaan</title>
        <meta name="description" content="Log in" />
      </Helmet>
      <div className="p-4 flex flex-col justify-center items-center h-screen bg-cover bg-center relative">
        <div className="w-full max-w-lg p-8 border border-gray-300 rounded-lg bg-white bg-opacity-90 text-left overflow-hidden">
          <img src={logo} alt="Ecoyaan Logo" className="mx-auto mb-6 w-14 h-14" /> {/* Add logo here with desired size */}
          <h3 className="mb-4 text-center text-3xl font-semibold">Log in</h3>
          <div className="w-full">
            <LoginForm onContinue={handleContinue} />
          </div>
        </div>
        {!hideElements && (
          <div className="mt-4 flex flex-col items-center w-full max-w-lg">
            <p className="mb-2 text-lg">New to Ecoyaan?</p>
            <button
              className="px-4 py-2 w-5/6 bg-gray-200 text-gray-800 rounded-lg"
              onClick={handleSignUpRedirect}
            >
              Create your Ecoyaan Account
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default Login;
