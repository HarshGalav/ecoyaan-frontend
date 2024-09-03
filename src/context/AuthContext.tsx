import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { CONSTANTS } from "../utils/constants";

interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  isSignup: boolean;
  setIsSignup: React.Dispatch<React.SetStateAction<boolean>>;
  verifyAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isSignup, setIsSignup] = useState<boolean>(false);

  const verifyAuth = async () => {
    const token = localStorage.getItem('accessToken');
    // console.log(token, "---->>>>>")
    if (token) {
      try {
        // Corrected API call to verify the token
        const response = await axios.get(`${CONSTANTS.API_ENDPOINT}/v1/Tokens/validate-token`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log(response)
        response.status == 200 ? setIsLoggedIn(true) : setIsLoggedIn(false);
      } catch (error) {
        console.error('Token verification failed:', error);
        setIsLoggedIn(false);
        localStorage.removeItem('');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('cartGuid');
        localStorage.removeItem('checkoutGuid')
      }
    } else {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    verifyAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, isSignup, setIsSignup, verifyAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
