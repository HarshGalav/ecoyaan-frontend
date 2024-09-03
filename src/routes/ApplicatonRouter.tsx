import { Route, Routes } from "react-router-dom";
import MainLayout from "./MainLayout";
import AboutUs from "../features/aboutus/aboutus";
import Login from "../features/login/login.tsx";
import Profile from "../features/ProfilePage/profile.tsx";
import PaymentStatus from "../features/PaymentFlow/PaymentStatusPage";
import ConfirmationPage from "../features/CheckoutFlow/ConfirmationPage.tsx";
import Products from "../features/Products/products";
import ApplyForInternship from "../features/careers/applyJob";
import CareerDescription from "../features/careers/careerDescription";
import Careers from "../features/careers/careers";
import Checkout from "../features/cart/checkout";
import PrivacyPolicy from "../features/privacy-policy/privacy-policy";
import ProductInfo from "../features/productInfo/ProductInfo";
import SellOnEcoyaan from "../features/sell-on-ecoyaan/sell-on-ecoyaan";
import TermsOfUse from "../features/terms-of-use/terms-of-use";
import Signup from "../features/signup/signup";
import ChallengeInfo from "../features/challenge-part/ChallengeInfo";
import EcoChallengeDetail from "../features/challenge-part/EcoChallenge/EcoChallengeDetail";
import EcoFilter from "../features/challenge-part/EcoChallenge/EcoFilter";
import FilterPart from "../features/challenge-part/weeklyChallenge/FilterPart";
import ChallengeDetail from "../features/challenge-part/weeklyChallenge/ChallengeDetail";
import Home from "../features/home/Home.tsx";
import PaymentAborted from "../features/PaymentFlow/PaymentAborted.tsx";
import Wishlist from "../features/wishlist/ShowWishlist.tsx";
import AddressPage from "../features/addressPage/addressPage.tsx";
import Contact from "../features/contact/contact.tsx";
import { ROUTES } from "../utils/Routes.ts";
import NewsletterSubscription from "../features/news-form/NewsletterSubscription.tsx";

const ApplicationRouter = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.ABOUT_US} element={<AboutUs />} />
        <Route path={ROUTES.PRIVACY_POLICY} element={<PrivacyPolicy />} />
        <Route path={ROUTES.TERMS_OF_USE} element={<TermsOfUse />} />
        <Route path={ROUTES.SELL_ON_ECOYAAN} element={<SellOnEcoyaan />} />
        <Route path={ROUTES.CAREERS} element={<Careers />} />
        <Route
          path={ROUTES.CAREER_DESCRIPTION}
          element={<CareerDescription />}
        />
        <Route path={ROUTES.APPLY} element={<ApplyForInternship />} />
        <Route path={ROUTES.PRODUCT_INFO} element={<ProductInfo />} />
        <Route path={ROUTES.SIGNUP} element={<Signup />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.PROFILE} element={<Profile />} />
        <Route path={ROUTES.PRODUCTS} element={<Products />} />
        <Route path={ROUTES.CHECKOUT} element={<Checkout />} />
        <Route path={ROUTES.CHALLENGE} element={<ChallengeInfo />} />
        <Route path={ROUTES.ALL_WEEK_CHALLENGE} element={<FilterPart />} />
        <Route path={ROUTES.ALL_ECO_CHALLENGE} element={<EcoFilter />} />
        <Route path={ROUTES.PAYMENT_ABORTED} element={<PaymentAborted />} />
        <Route
          path={ROUTES.ALL_ECO_CHALLENGE_DETAIL}
          element={<EcoChallengeDetail />}
        />
        <Route path={ROUTES.CHALLENGE_DETAIL} element={<ChallengeDetail />} />
        <Route path={ROUTES.SHOW_WISHLIST} element={<Wishlist />} />
        <Route path={ROUTES.ADDRESS_PAGE} element={<AddressPage />} />
        <Route path={ROUTES.CONTACT_US} element={<Contact />} />
        <Route path={ROUTES.CONFIRM_PAYMENT} element={<ConfirmationPage />} />
        <Route path={ROUTES.PAYMENT_STATUS} element={<PaymentStatus />} />
        <Route path={ROUTES.CHECKOUT} element={<Checkout />} />
        <Route
          path={ROUTES.NEWSLETTER_SUBSCRIPTION}
          element={<NewsletterSubscription />}
        />
      </Route>
    </Routes>
  );
};

export default ApplicationRouter;
