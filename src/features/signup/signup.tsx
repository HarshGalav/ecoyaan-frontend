import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignUpForm from "./Forms";
import { Helmet } from 'react-helmet-async';
import logo from '/images/logo512.png';  // Import the logo
import { ROUTES } from '../../utils/Routes';


function Signup() {
  const navigate = useNavigate();
  const [hideElements, setHideElements] = useState(false);

  const handleSignUpRedirect = () => {
    navigate(ROUTES.LOGIN);
  };

  const handleContinue = () => {
    setHideElements(true);
  };

  

  return (
    <>
      <Helmet>
        <title>Sign Up | Ecoyaan</title>
        <meta name="description" content="Signup" />
      </Helmet>
      <div className="p-4 flex flex-col justify-center items-center h-screen bg-cover bg-center relative">
        
        
      
        <div className="w-full max-w-lg p-8 border border-gray-300 rounded-lg bg-white bg-opacity-90 text-left">
        <img src={logo} alt="Ecoyaan Logo" className="mx-auto mb-6 w-14 h-14" />
          <h3 className="mb-4 text-center text-3xl font-semibold">Sign up</h3>
          <br />
          <div className="w-full">
            <SignUpForm onContinue={handleContinue} />
          </div>
        </div>
        {!hideElements && (
          <div className="mt-4 flex flex-col items-center w-full max-w-lg">
            <p className="mb-2 text-lg">Already have an account?</p>
            <button
              className="px-4 py-2 w-5/6 bg-gray-200 text-gray-800 rounded-lg"
              onClick={handleSignUpRedirect}
            >
              Login
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default Signup;
