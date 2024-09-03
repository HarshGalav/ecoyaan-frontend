import { Route, Routes } from "react-router-dom";
import AboutUs from "./features/aboutus/aboutus";
// import Home from "./features/home/home";
import PrivacyPolicy from "./features/privacy-policy/privacy-policy";
import TermsOfUse from "./features/terms-of-use/terms-of-use";
import Careers from "./features/careers/careers";
import CareerDescription from "./features/careers/careerDescription";
import ApplyForInternship from "./features/careers/applyJob";
import SellOnEcoyaan from "./features/sell-on-ecoyaan/sell-on-ecoyaan";
import ConfirmationPage from "./features/CheckoutFlow/ConfirmationPage";
import PaymentStatus from "./features/PaymentFlow/PaymentStatusPage";
import Products from "./features/Products/products";
import Checkout from "./features/cart/checkout";
import ProductInfo from "./features/productInfo/ProductInfo";
import MainLayout from "./routes/MainLayout";
import SignUp from "./features/signup/signup";
import Login from "./features/login/login";
import Profile from "./features/ProfilePage/profile";

import { AuthProvider } from "../src/context/AuthContext";
import ChallengeInfo from "./features/challenge-part/ChallengeInfo";
import FilterPart from "./features/challenge-part/weeklyChallenge/FilterPart";
import ChallengeDetail from "./features/challenge-part/weeklyChallenge/ChallengeDetail";
import EcoFilter from "./features/challenge-part/EcoChallenge/EcoFilter";
import EcoChallengeDetail from "./features/challenge-part/EcoChallenge/EcoChallengeDetail";
import Home from "./features/home/Home";
import { ROUTES } from "./utils/Routes";

const AppRoutes = () => {
  return (
    <AuthProvider>
          <Routes>
            <Route element={<MainLayout />}>
            <Route path={ROUTES.HOME} element={<Home />} />
            <Route path={ROUTES.ABOUT_US} element={<AboutUs />} />
            <Route path={ROUTES.PRIVACY_POLICY} element={<PrivacyPolicy />} />
            <Route path={ROUTES.TERMS_OF_USE} element={<TermsOfUse />} />
            <Route path={ROUTES.SELL_ON_ECOYAAN} element={<SellOnEcoyaan />} />
            <Route path={ROUTES.CAREERS} element={<Careers />} />
            <Route path={ROUTES.CAREER_DESCRIPTION} element={<CareerDescription />} />
            <Route path={ROUTES.APPLY} element={<ApplyForInternship />} />
            <Route path={ROUTES.PRODUCT_INFO} element={<ProductInfo />} />
            <Route path={ROUTES.SIGNUP} element={<SignUp />} />
            <Route path={ROUTES.LOGIN} element={<Login />} />
            <Route path={ROUTES.PRODUCTS} element={<Products />} />
            <Route path={ROUTES.CHECKOUT} element={<Checkout />} />
            <Route path={ROUTES.CONFIRM_PAYMENT} element={<ConfirmationPage />} />
            <Route path={ROUTES.PAYMENT_STATUS} element={<PaymentStatus />} />        
            <Route path={ROUTES.CHECKOUT} element={<Checkout />} />
            <Route path={ROUTES.PROFILE} element={<Profile />} />
            </Route>
          </Routes>
      <Routes>
        <Route element={<MainLayout />}>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.ABOUT_US} element={<AboutUs />} />
        <Route path={ROUTES.PRIVACY_POLICY} element={<PrivacyPolicy />} />
        <Route path={ROUTES.TERMS_OF_USE} element={<TermsOfUse />} />
        <Route path={ROUTES.SELL_ON_ECOYAAN} element={<SellOnEcoyaan />} />
        <Route path={ROUTES.CAREERS} element={<Careers />} />
        <Route path={ROUTES.CAREER_DESCRIPTION} element={<CareerDescription />} />
        <Route path={ROUTES.APPLY} element={<ApplyForInternship />} />
        <Route path={ROUTES.PRODUCT_INFO} element={<ProductInfo />} />
        <Route path={ROUTES.CHALLENGE} element={<ChallengeInfo />} />
        <Route path={ROUTES.ALL_WEEK_CHALLENGE} element={<FilterPart />} />
        <Route path={ROUTES.ALL_ECO_CHALLENGE} element={<EcoFilter />} />
        <Route path={ROUTES.ALL_ECO_CHALLENGE_DETAIL}  element={<EcoChallengeDetail />} />
        <Route path={ROUTES.CHALLENGE_DETAIL} element={<ChallengeDetail />} />
        <Route path={ROUTES.SIGNUP} element={<SignUp />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.PRODUCTS} element={<Products />} />
        <Route path={ROUTES.CHECKOUT} element={<Checkout />} />
        <Route path={ROUTES.CONFIRM_PAYMENT} element={<ConfirmationPage />} />
        <Route path={ROUTES.PAYMENT_STATUS} element={<PaymentStatus />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default AppRoutes;
