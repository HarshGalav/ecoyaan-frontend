export const SignUpMethod = {
  PHONE: "phone",
  EMAIL: "email",
  NONE: "",
} as const;

export const Severity = {
  SUCCESS: "success",
  ERROR: "error",
} as const;

export const Text = {
  YOUR_NAME: "Your Name:",
  ENTER_PHONE_OR_EMAIL: "Enter your phone number or email:",
  CONTINUE: "Continue",
  TERMS_OF_USE: "Terms of Use",
  PRIVACY_POLICY: "Privacy Policy",
  ALREADY_HAVE_ACCOUNT: "Already have an account?",
  LOGIN: "Login",
  OTP_SENT_SUCCESS: "OTP sent successfully! Please check your ",
  FAILED_TO_SEND_OTP: "Failed to send OTP. Please try again.",
  OTP_VERIFICATION_SUCCESS: "Sign up successful!",
  OTP_VERIFICATION_FAILED: "OTP verification failed. Please try again.",
  RESEND_OTP_SUCCESS: "OTP resent successfully! Please check your ",
  FAILED_TO_RESEND_OTP: "Failed to resend OTP. Please try again.",
  SESSION_EXPIRED: "Session expired. Please log in again.",
  USER_PROFILE_CREATED: "User profile created successfully!",
  FAILED_TO_CREATE_PROFILE: "Failed to create user profile. Please try again.",
  VERIFICATION_CODE_SENT: "We have sent a verification code via ",
  SMS: "SMS",
  EMAIL: "email",
  PHONE: "Phone Number",
  EMAIL1: "Email ID",
  SIGNUP_USING: "Sign up using",
  RESEND_OTP: "Resend OTP",
  RESEND_OTP_IN: "Resend OTP in ",
  SECONDS: " seconds",
  FIRST_LAST_NAME: "First and Last name",
  ENTER_PHONE_EMAIL: "Enter your phone number or email",
};

export const Timer = {
  DEFAULT: 30,
  ALERT_DISPLAY: 5000,
  TOKEN_REFRESH_INTERVAL: 15 * 60 * 1000, // 15 minutes
  RESEND_OTP_INTERVAL: 1000, // 1 second
};

export const Masking = {
  CHAR: "*",
  VISIBLE_EMAIL_PART: 4,
};
