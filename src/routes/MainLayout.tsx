import { useState, useEffect, useCallback,useRef } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import useScrollToTop from "../hooks/useScrollToTop";
import Navbar from "../components/navbar/navbar";
import SearchBar from "../components/searchBar/searchBar";
import {  NotificationsOutlined } from "@mui/icons-material";
import { INavItem } from "../components/navbar/navbarProps";
import DeliveryLoc from "../features/home/features/DeliveryLoc";
import Footer from "../features/home/components/Footer/Footer";
import useOutsideClick from "../hooks/useOutsideClick";
import { verifyAuth} from "../providers/authentication/authProvider";
import { fetchCartItems, selectCartGuid, selectItems, setCartGuid } from "../features/cart/providers/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";
import { AppDispatch, RootState} from "../stores/stores";
// import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { CONSTANTS } from "../utils/constants";

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { selectWishlistItems } from "../features/wishlist/WishlistSlice";
import { ROUTES } from "../utils/Routes";
import { getTranslatedText } from "../utils/stringUtils";

const getFirstLetter = (name: string | undefined): string => {
  if (!name) return '';
  return name.charAt(0).toUpperCase();
};

interface AccountDropDownInterface{
  profileIcon:string
}

function MainLayout() {
  const navigate = useNavigate();
  const { handleScrollToTop } = useScrollToTop();
  
  const dispatch = useDispatch<AppDispatch>();

  const cartGuid = useSelector(selectCartGuid);
  const cartItems = useSelector(selectItems);
  const wishlistItems = useSelector(selectWishlistItems);
  const isLoggedIn = useSelector((state: RootState) => state.authProvider.isLoggedIn);

  const isSignup = useSelector((state: RootState) => state.authProvider.isSignup);
  useEffect(() => {
    const storedCartGuid = localStorage.getItem('cartGuid');
    if (storedCartGuid && !cartGuid) {
      dispatch(setCartGuid(storedCartGuid));
    }
    if (storedCartGuid) {
      dispatch(fetchCartItems(storedCartGuid));
    }
  }, [dispatch, cartGuid]);

  const handleCartClick = async () => {
    if (cartGuid) {
      try {
        await dispatch(fetchCartItems(cartGuid)).unwrap();
        navigate(ROUTES.CHECKOUT);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    }
    else {
      navigate(ROUTES.CHECKOUT)
    }
  };
  
  const location = useLocation();
  // const { isLoggedIn, isSignup } = useAuth();
  const [profileIcon, setProfileIcon] = useState<string>('');
  const accessToken = localStorage.getItem('accessToken');
  const [showPopup, setShowPopup] = useState<boolean>(true);
  const [isAddressLoading, setIsAddressLoading] = useState(false);


  const navItems: INavItem[] = [
    {
      label: "Categories",
      leading: null,
      path: null,
      children: [
        {
          label: "Categories1",
          leading: null,
          path: "",
          children: [],
          isParent: true,
          callBack: () => {},
        },
        {
          label: "Categories2",
          leading: null,
          path: "",
          children: [],
          isParent: true,
          callBack: () => {},
        },
      ],
      isParent: true,
      callBack: () => {},
    },
    {
      label: "Brands",
      leading: null,
      path: null,
      children: [
        {
          label: "Brands1",
          leading: null,
          path: "",
          children: [],
          isParent: true,
          callBack: () => {},
        },
        {
          label: "Brands2",
          leading: null,
          path: "",
          children: [],
          isParent: true,
          callBack: () => {},
        },
      ],
      isParent: true,
      callBack: () => {},
    },
    {
      label: "Sustainability",
      leading: null,
      path: null,
      children: [
        {
          label: "Sustainability1",
          leading: null,
          path: "",
          children: [],
          isParent: true,
          callBack: () => {},
        },
        {
          label: "Sustainability2",
          leading: null,
          path: "",
          children: [],
          isParent: true,
          callBack: () => {},
        },
      ],
      isParent: true,
      callBack: () => {},
    },
    {
      label: "About Us",
      leading: null,
      path: "about-us",
      children:[],
      isParent: true,
      callBack: () => {}
    },
  ];

  const fetchUserData = useCallback(async () => {
    try {
      setIsAddressLoading(true);
      const userId = localStorage.getItem('guest_id');
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    
      if (userId) {
        const response = await axios.get(`${CONSTANTS.API_ENDPOINT}/v1/guests/${userId}`);
        const data = response.data.guest;
        setProfileIcon(getFirstLetter(data.first_name));
        const cartResponse = await axios.get(`${CONSTANTS.API_ENDPOINT}/v1/cart`);
        if (cartResponse.data && cartResponse.data.length > 0) {
          const cartGuid = cartResponse.data[0].cart_guid;
          if (cartGuid) {
            dispatch(setCartGuid(cartGuid));
            dispatch(fetchCartItems(cartGuid));
          }
        }
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
    finally {
      setIsAddressLoading(false);
    }
  }, [accessToken]);
  console.log('isLoggedIn:', isLoggedIn, 'isSignup:', isSignup);

  useEffect(() => {
    if (isLoggedIn || isSignup) {
      fetchUserData();
    }
  }, [isLoggedIn, isSignup, fetchUserData]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handlePopupClick = (path: string) => {
    setShowPopup(false);
    navigate(path);
  };
  const [scrollPosition, setScrollPosition] = useState(0);

  function changeScrollPosition() {
    if (scrollY > 0 || pageYOffset > 0) {
      setScrollPosition((x) => scrollY);
    } else if (scrollY == 0 || pageYOffset == 0) {
      setScrollPosition((x) => 0);
    }
  }

  useEffect(() => {
    // Ensure token verification happens once component mounts
    dispatch(verifyAuth());
  }, [dispatch]);

  useEffect(() => {
    window.addEventListener("scroll", () => changeScrollPosition());

    return () => {
      window.removeEventListener("scroll", changeScrollPosition);
    };
  }, []);


  return (
    <>
      <Navbar
        leading={
          <div
            className={`z-10 brand-title  lg:block`}
            onClick={() => navigate(ROUTES.HOME)}
          >
            Ecoyaan
          </div>
        }
        onClickLeading={() => navigate(ROUTES.HOME)}
        centerContent={
          <div className="hidden xl:block h-[60%]">
            <SearchBar />
          </div>
        }
        actions={[
          <div onClick={() => {}}>
            <NotificationsOutlined
              sx={{
                fontSize: {
                  xs: "1.25rem",
                  md: "1.4rem",
                },
              }}
            />
          </div>,
          (isLoggedIn || isSignup) ? (
            
            <div className="relative">
              <div>
            <AccountDropDown profileIcon={profileIcon}/>
            
          </div>
              
            </div>
          ) : (
            <div className="relative ">
              <div 
                onClick={() => navigate(ROUTES.LOGIN)}
                className="text-black xs:text-base w-max  font-bold  cursor-pointer"
              >
                {getTranslatedText("Log_in")}
              </div>
              {showPopup && (
                <div 
                  className="absolute top-10 right-4 bg-white border border-gray-400 p-2 rounded shadow-lg w-36 text-center text-sm z-50"
                >
                  <button 
                    className="bg-green-500 text-white py-1 px-4 rounded mx-auto"
                    onClick={() => handlePopupClick(ROUTES.LOGIN)}
                  >
                   {getTranslatedText("Log_in")}
                  </button>
                  <div className="mt-1">
                  {getTranslatedText("New_customer")}
                    <a 
                      href="#" 
                      className="text-blue-500" 
                      onClick={() => handlePopupClick(ROUTES.SIGNUP)}
                    >
                      {getTranslatedText("Sign_up_here")}
                    </a>
                  </div>
                  <div 
                    className="absolute left-1/2 transform -translate-x-1/2 -top-2 w-0 h-0 border-l-6 border-l-transparent border-r-6 border-r-transparent border-b-6 border-b-white"
                  ></div>
                </div>
              )}
            </div>
          ),
            <div
              onClick={() => {navigate(ROUTES.SHOW_WISHLIST)}}
              className="relative lg:block cursor-pointer"
            >
              <FavoriteBorderIcon />
              <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/4 flex items-center justify-center h-4 w-4 rounded-full bg-pink-600 text-xs text-white font-semibold">
                {wishlistItems.length}
              </span>
            </div>
,
          <div onClick={handleCartClick} className="relative cursor-pointer">
            <ShoppingCartOutlinedIcon />
            <span className="absolute -top-1 -right-1.5 flex items-center justify-center h-4 w-4 rounded-full bg-green-600 text-xs text-white font-semibold">
              {cartItems.length}
            </span>
          </div>
,
        ]}
        navItems={navItems}
      />
      <main className=" w-full mt-16 overflow-x-hidden bg-white">
        <div className="xl:hidden pt-3">
          <SearchBar />
          <DeliveryLoc isLoading={isAddressLoading} />
          </div>
        <Outlet />
      </main>
      <div className=" w-full flex flex-col items-center bottom-0">
        <Footer />
        <div className="bg-black w-full text-white py-3 flex items-center justify-center">
          <p className=" text-sm">&copy; {getTranslatedText("copy_right")}</p>
        </div>
      </div>
    </>
  );
}

export default MainLayout;

interface IDropDownItems {
  label: string;
  className: string;
  navigation: string;
}


function AccountDropDown({profileIcon=""}:AccountDropDownInterface) {
  const [isVisible, setIsVisible] = useState(false);
  const dropDownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  // const handleVisibility = () => setIsVisible((prev) => !prev);

  const mouseInsideRef = useRef(false);

  useOutsideClick(dropDownRef, () => setIsVisible(false));

  const dropdownItems: IDropDownItems[] = [
    {
      label: "Profile",
      className: "",
      navigation: ROUTES.PROFILE
    },
    {
      label: "Orders",
      className: "",
      navigation: ROUTES.ORDERS
    },
    {
      label: "Wishlist",
      className: "",
      navigation: ROUTES.SHOW_WISHLIST
    },
    {
      label: "Addresses",
      className: "",
      navigation: ROUTES.ADDRESS_PAGE
    },
    { label: "Newsletter Subscription", className: "border-b" ,
      navigation: ROUTES.NEWSLETTER_SUBSCRIPTION},
    {
      label: "Preferences",
      className: "",
      navigation: ROUTES.PREFERENCES
    },
    {
      label: "Contact Us",
      className: "",
      navigation: ROUTES.CONTACT_US
    },
  ];

  const handleMouseEnter = () => {
    mouseInsideRef.current = true;
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    mouseInsideRef.current = false;
    setTimeout(() => {
      if (!mouseInsideRef.current) {
        setIsVisible(false);
      }
    }, 200); // Delay to prevent accidental closing
  };

  return (
    <div
      ref={dropDownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative cursor-pointer"
    >
      <div className="cursor-pointer">
        <div
                className="flex items-center justify-center w-10 h-10 bg-gray-600 rounded-full text-white font-bold text-lg cursor-pointer"
              >
                {profileIcon}
              </div>
      </div>
      {isVisible && (
      <div className="min-w-max absolute -right-16 md:top-14 xs:top-12 shadow-2xl z-50 bg-white border border-shadow-one rounded-sm">
       
        {  dropdownItems.map((item, index) => (
            <p
              key={index}
              className={twMerge(
                `w-full px-4 py-2 xs:text-xs md:text-base text-gray-700 hover:bg-shadow-three cursor-pointer text-nowrap}`,
                item.className,
              )}
              onClick={() => navigate(`${item.navigation}`)}              
            >
              {item.label}
            </p>
          ))}
      </div>
      )}
    </div>
  );
}
