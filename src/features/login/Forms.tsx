import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormSchema, LoginFormType } from "../../models/LoginFormSchema";
import CustomButton from "../../components/ui/CustomButton";
import CustomAlert from "../../components/ui/CustomAlert";
import { Link } from "react-router-dom";
import OTPInput from "../otp/OTPInput";
import axios from "axios";
import {
  sendOtpApi,
  verifyOtpApi,
  createUserProfileApi,
  resendOtpApi,
  refreshAccessTokenApi,
} from "./apiService";
import {
  SIGN_UP_METHODS,
  SEVERITY,
  INITIAL_TIMER,
  MESSAGES,
} from "./constants";
import { useAuth } from "../../context/AuthContext"; // Import useAuth
import { cartApiService } from "../cart/providers/cartApiService";
import { ROUTES } from "../../utils/Routes";

interface LoginFormProps {
  onContinue: () => void;
}

function LoginForm({ onContinue }: LoginFormProps) {
  const { setIsLoggedIn } = useAuth(); // Destructure setIsLoggedIn from useAuth
  const navigate = useNavigate();
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [show, setShow] = useState(false);
  const [severity, setSeverity] = useState<
    typeof SEVERITY.SUCCESS | typeof SEVERITY.ERROR
  >(SEVERITY.SUCCESS);
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [signUpMethod, setSignUpMethod] = useState<
    | typeof SIGN_UP_METHODS.PHONE
    | typeof SIGN_UP_METHODS.EMAIL
    | typeof SIGN_UP_METHODS.NONE
  >(SIGN_UP_METHODS.NONE);
  const [guestId, setGuestId] = useState("");
  const [timer, setTimer] = useState(INITIAL_TIMER);
  const [resendOtpEnabled, setResendOtpEnabled] = useState(false);
  const [otp, setOtp] = useState("");
  const [maskedContact, setMaskedContact] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken") || "",
  );
  const [refreshToken, setRefreshToken] = useState(
    localStorage.getItem("refreshToken") || "",
  );
  const [otpError, setOtpError] = useState(false); // New state for OTP error

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<LoginFormType>({
    mode: "all",
    resolver: zodResolver(LoginFormSchema),
  });

  const watchContactInfo = watch("identifier");

  useEffect(() => {
    if (watchContactInfo) {
      if (/^\d{10}$/.test(watchContactInfo)) {
        setSignUpMethod(SIGN_UP_METHODS.PHONE);
        setMaskedContact(maskPhoneNumber(watchContactInfo));
      } else if (watchContactInfo.endsWith(".com")) {
        setSignUpMethod(SIGN_UP_METHODS.EMAIL);
        setMaskedContact(maskEmail(watchContactInfo));
      } else {
        setSignUpMethod(SIGN_UP_METHODS.NONE);
      }
    }
  }, [watchContactInfo]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (otpSent && !resendOtpEnabled) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(interval);
            setResendOtpEnabled(true);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpSent, resendOtpEnabled]);

  const handleOtpChange = (value: string) => {
    setOtp(value);
    setOtpError(false); // Reset OTP error on change
  };

  const sendOtp: SubmitHandler<LoginFormType> = async (data) => {
    setLoading(true);
    try {
        reset({ otp: "" });
        const response = await sendOtpApi({ ...data, source: 0 });
        setLoading(false);
        setOtpSent(true);
        setGuestId(response.guest_id);
        localStorage.setItem('guest_id', response.guest_id);
        setShow(true);
        setSuccessMsg(MESSAGES.OTP_SENT_SUCCESS + (signUpMethod === SIGN_UP_METHODS.PHONE ? MESSAGES.SMS : MESSAGES.EMAIL));
        setErrorMsg("");
        setResendOtpEnabled(false);
        setTimer(INITIAL_TIMER);
        onContinue(); 
    } catch (error) {
        console.log(error);
        setLoading(false);
        setShow(true);
        setSuccessMsg("");
        setErrorMsg("No account found with that "+(signUpMethod === SIGN_UP_METHODS.PHONE ? MESSAGES.PHONE : MESSAGES.EMAIL)+". Please try signing in first.");
    }
};


  const createUserProfile = async (verificationCode: string) => {
    const clientInfo = {
      user_agent: navigator.userAgent,
      os: navigator.platform,
      browser: navigator.appName,
      browser_version: navigator.appVersion,
      device_type: /Mobi|Android/i.test(navigator.userAgent)
        ? "mobile"
        : "desktop",
      screen_resolution: `${window.screen.width}x${window.screen.height}`,
      language: navigator.language,
      locale: Intl.DateTimeFormat().resolvedOptions().locale,
      time_zone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      network: navigator.connection?.effectiveType || "unknown",
    };

    const data = {
      code: verificationCode,
      client_info: clientInfo,
    };

    try {
      const response = await createUserProfileApi(data);
      console.log("User profile created:", response);
      setAccessToken(response.access_token);
      setRefreshToken(response.refresh_token);
      setShow(true);
      setSuccessMsg(MESSAGES.PROFILE_CREATION_SUCCESS);
      // Save tokens to local storage
      localStorage.setItem("accessToken", response.access_token);
      localStorage.setItem("refreshToken", response.refresh_token);
      // Redirect to home tab after successful profile creation
      const anonymousCartGuid = localStorage.getItem('cartGuid');
      if (anonymousCartGuid) {
        try {
          await cartApiService.mergeCartItems(anonymousCartGuid);
          localStorage.removeItem('cartGuid');
        } catch (error) {
          console.error('Failed to merge anonymous cart:', error);
        }
      }

      const loginForCheckout = localStorage.getItem('loginForCheckout');
      if (loginForCheckout === 'true') {
        localStorage.removeItem('loginForCheckout'); 
        navigate(ROUTES.CONFIRM_PAYMENT);
      } else {
        navigate(ROUTES.HOME);
      }
    } catch (error) {
      console.log(error);
      setShow(true);
      setErrorMsg(MESSAGES.PROFILE_CREATION_FAILURE);
    }
  };

  const verifyOtp: SubmitHandler<LoginFormType> = async () => {
    setLoading(true);
    try {
      const response = await verifyOtpApi(guestId, otp);
      setLoading(false);
      setOtpVerified(true);
      setShow(true);
      setSuccessMsg(MESSAGES.OTP_VERIFIED_SUCCESS);
      setErrorMsg("");
      reset();
      const verificationCode = response.verification_code;
      setVerificationCode(verificationCode);
      setIsLoggedIn(true); // Update the authentication state
      localStorage.setItem("verificationCode", verificationCode); // Store the verification code locally
      await createUserProfile(verificationCode);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setSuccessMsg("");
      setOtpError(true); // Set OTP error
      setOtp(""); // Reset OTP input
    }
  };

  const resendOtp = async () => {
    setLoading(true);
    try {
      await resendOtpApi({ identifier: watchContactInfo });
      setLoading(false);
      setSeverity(SEVERITY.SUCCESS);
      setShow(true);
      setSuccessMsg(
        MESSAGES.RESEND_OTP_SUCCESS +
          (signUpMethod === SIGN_UP_METHODS.PHONE
            ? MESSAGES.SMS
            : MESSAGES.EMAIL),
      );
      setResendOtpEnabled(false);
      setTimer(INITIAL_TIMER);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setSeverity(SEVERITY.ERROR);
      setShow(true);
      setErrorMsg(MESSAGES.RESEND_OTP_FAILURE);
    }
  };

  const refreshAccessToken = useCallback(async () => {
    const clientInfo = {
      user_agent: navigator.userAgent,
      os: navigator.platform,
      browser: navigator.appName,
      browser_version: navigator.appVersion,
      device_type: /Mobi|Android/i.test(navigator.userAgent)
        ? "mobile"
        : "desktop",
      screen_resolution: `${window.screen.width}x${window.screen.height}`,
      language: navigator.language,
      locale: Intl.DateTimeFormat().resolvedOptions().locale,
      time_zone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      network: navigator.connection?.effectiveType || "unknown",
    };

    const data = {
      refresh_token: refreshToken,
      reference_id: 0,
      client_info: clientInfo,
    };

    try {
      const response = await refreshAccessTokenApi(data);
      setAccessToken(response.access_token);
      // Update the stored access token
      localStorage.setItem("accessToken", response.access_token);
      axios.defaults.headers.common["Authorization"] =
        `Bearer ${response.access_token}`;
    } catch (error) {
      console.log("Failed to refresh access token:", error);
      setShow(true);
      setErrorMsg(MESSAGES.SESSION_EXPIRED);
      navigate(ROUTES.LOGIN);
    }
  }, [refreshToken, guestId, navigate]);

  useEffect(() => {
    if (accessToken) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    }
  }, [accessToken]);

  useEffect(() => {
    const interval = setInterval(
      () => {
        refreshAccessToken();
      },
      15 * 60 * 1000,
    ); // Refresh token every 15 minutes

    return () => clearInterval(interval);
  }, [refreshAccessToken]);

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        setShow(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [show]);

  const handleClose = () => {
    setShow(false);
  };

  const maskEmail = (email: string) => {
    const [user, domain] = email.split("@");
    const visiblePart = user.slice(0, 4);
    const maskedPart = "*".repeat(user.length - 4);
    return visiblePart + maskedPart + "@" + domain;
  };

  const maskPhoneNumber = (phone: string) => {
    return phone.slice(0, 2) + "*".repeat(6) + phone.slice(-2);
  };

  const getAlternativeMethod = () => {
    return signUpMethod === SIGN_UP_METHODS.PHONE
      ? SIGN_UP_METHODS.EMAIL
      : SIGN_UP_METHODS.PHONE;
  };

  const getAlternativeMethodText = () => {
    return signUpMethod === SIGN_UP_METHODS.PHONE
      ? MESSAGES.EMAIL1
      : MESSAGES.PHONE;
  };

  const handleToggleLoginMethod = () => {
    setOtpSent(false);
    reset();
    setSignUpMethod(getAlternativeMethod());
  };

  
  return (
    <>
      <CustomAlert
        className={`alert-trans relative z-50 ${show ? "show-alert" : ""}`}
        severity={successMsg ? SEVERITY.SUCCESS : SEVERITY.ERROR}
        message={successMsg || errorMsg}
        alertTitle={successMsg ? "Success" : "Error"}
        onClose={handleClose}
      />
      {!otpSent ? (
        <form onSubmit={handleSubmit(sendOtp)}>
          <div className="mb-4">
            <label className="block font-bold text-lg pb-2">
              {MESSAGES.ENTER_PHONE_EMAIL}
            </label>
            <input
              type="text"
              className={`block w-full p-2 border rounded ${errors.identifier ? "border-red-500" : "border-gray-300"}`}
              {...register("identifier")}
              placeholder={MESSAGES.ENTER_PHONE_EMAIL1}
            />
            {errors.identifier && (
              <span className="text-red-500 text-sm">
                {errors.identifier?.message}
              </span>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-green-500 text-white rounded mt-4 hover:bg-green-600"
          >
            {MESSAGES.CONTINUE}
          </button>
          <div className="mt-4 text-sm">
            <p>
              {MESSAGES.BY_CONTINUING}
              <Link to={ROUTES.TERMS_OF_USE} className="text-blue-500">
                {MESSAGES.TERMS_USE}
              </Link>
              {MESSAGES.AND}
              <Link to={ROUTES.PRIVACY_POLICY} className="text-blue-500">
                {MESSAGES.PRIVACY_POLICY}
              </Link>
            </p>
          </div>
        </form>
      ) : (
        <form onSubmit={handleSubmit(verifyOtp)}>
          <div className="mb-4">
            <label>
              {MESSAGES.WE_HAVE_SENT}{" "}
              {signUpMethod === SIGN_UP_METHODS.PHONE
                ? MESSAGES.SMS
                : MESSAGES.EMAIL}{" "}
              {MESSAGES.TO} {maskedContact}
            </label>
            <br />
            <OTPInput
              length={6}
              onChange={handleOtpChange}
              hasError={otpError}
            />
            {otpError && (
              <span className="text-red-500 text-sm">
                OTP verification failed, Please try again
              </span>
            )}
          </div>
          <div className="flex flex-col gap-4 mt-4">
            <button
              type="submit"
              className="w-full py-2 bg-green-500 text-white rounded mt-4 hover:bg-green-600"
            >
              {MESSAGES.VERIFY_OTP}
            </button>
            {resendOtpEnabled ? (
              <button
                type="button"
                onClick={resendOtp}
                className="bg-gray-200 text-gray-800 py-2 rounded hover:bg-gray-300"//not working
                disabled={loading}
                
              >
                {MESSAGES.RESEND_OTP}
              </button>
            ) : (
              <p>
                {MESSAGES.RESEND_OTP_IN} {timer} {MESSAGES.SECONDS}
              </p>
            )}
          </div>
          <div className="mt-4 text-center text-sm">
            <p>
              {MESSAGES.LOGIN_USING}{" "}
              <button
                type="button"
                onClick={handleToggleLoginMethod}
                className="text-blue-500 underline"
              >
                {getAlternativeMethodText()}
              </button>
            </p>
          </div>
        </form>
      )}
    </>
  );
}

export default LoginForm;