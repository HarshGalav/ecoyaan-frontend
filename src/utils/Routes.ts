// routes.ts (or Routes.ts)
export const ROUTES = {
  HOME: "/",
  ABOUT_US: "/about-us",
  PRIVACY_POLICY: "/privacy-policy",
  TERMS_OF_USE: "/termsOfUse",
  SELL_ON_ECOYAAN: "/sellOnEcoyaan",
  CAREERS: "/careers",
  SHIPPING_RETURN_POLICY: "/shipping-and-return-policy",
  CAREER_DESCRIPTION: "/careerDescription",
  APPLY: "/apply",
  PRODUCT_INFO: "/productInfo",
  SIGNUP: "/signup",
  CATEGORIES: "/categories",
  PROFILE: "/profile",
  ORDERS: "/orders",
  LOGIN: "/login",
  PRODUCTS: "/products",
  CHECKOUT: "/checkout",
  HOME_INFO: "/home",
  CHALLENGE: "/challenges",
  ALL_WEEK_CHALLENGE: "/allWeekChallenges",
  CHALLENGE_DETAIL: "/challengeDetail/:title",
  ALL_ECO_CHALLENGE: "/allEcoChallenges",
  ALL_ECO_CHALLENGE_DETAIL: "/ecoChallengeDetail/:title",
  PAYMENT_ABORTED: "/paymentAborted",
  PAYMENT_STATUS: "/PaymentStatus",
  CONFIRM_PAYMENT: "/ConfirmPayment",
  SHOW_WISHLIST: '/wishlist',
  ADDRESS_PAGE: '/addresses',
  CONTACT_US: '/contact-us',
  WRITE_REVIEW: "/writeReview",
  CHALLENGES_PLEDGES: "/challenges-pledges",
  BLOG:"blog",
  NEWSLETTER_SUBSCRIPTION: '/newsletter-subscription',
  PREFERENCES: '/preferences'
} as const;

export type Routes = typeof ROUTES;

export const getRouteValue = (route :string): string => {
  var pathKey = route.replace('ROUTES.','');
  if (pathKey in ROUTES) 
    { 
      return ROUTES[pathKey as keyof Routes]; 
    }
  else{
    return route;
  } 
};