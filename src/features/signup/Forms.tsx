import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {SignUpFormSchema,  SignUpFormType} from "../../models/SignUpFormSchema";
import CustomAlert from "../../components/ui/CustomAlert";
import axios from "axios";
import { Link } from "react-router-dom";
import OTPInput from "../otp/OTPInput";
import { useAuth } from "../../context/AuthContext"; // Import useAuth
import {  sendOtpApi,  verifyOtpApi,  createUserProfileApi,  resendOtpApi,  refreshAccessTokenApi} from "./apiService";
import {  SignUpMethod,  Severity,  Text,  Timer,  Masking} from "./constants";
import { cartApiService } from "../cart/providers/cartApiService";
import { ROUTES } from "../../utils/Routes";

type SignUpMethodType = (typeof SignUpMethod)[keyof typeof SignUpMethod];
type SeverityType = (typeof Severity)[keyof typeof Severity];

interface SignupFormProps {
  onContinue: () => void;
}

function SignUpForm({ onContinue }: SignupFormProps) {
  const { setIsSignup } = useAuth();
  const navigate = useNavigate();
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [show, setShow] = useState(false);
  const [severity, setSeverity] = useState<SeverityType>(Severity.SUCCESS);
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [signUpMethod, setSignUpMethod] = useState<SignUpMethodType>(
    SignUpMethod.NONE,
  );
  const [guestId, setGuestId] = useState("");
  const [timer, setTimer] = useState(Timer.DEFAULT);
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
  const [otpError, setOtpError] = useState(false); // New state to handle OTP error

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<SignUpFormType>({
    mode: "all",
    resolver: zodResolver(SignUpFormSchema),
  });

  const watchContactInfo = watch("identifier");

  useEffect(() => {
    if (watchContactInfo) {
      if (/^\d{10}$/.test(watchContactInfo)) {
        setSignUpMethod(SignUpMethod.PHONE);
        setMaskedContact(maskPhoneNumber(watchContactInfo));
      } else if (watchContactInfo.endsWith(".com")) {
        setSignUpMethod(SignUpMethod.EMAIL);
        setMaskedContact(maskEmail(watchContactInfo));
      } else {
        setSignUpMethod(SignUpMethod.NONE);
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
      }, Timer.RESEND_OTP_INTERVAL);
    }
    return () => clearInterval(interval);
  }, [otpSent, resendOtpEnabled]);

  const handleOtpChange = (value: string) => {
    setOtp(value);
    setOtpError(false); // Reset OTP error state on change
  };

  const sendOtp: SubmitHandler<SignUpFormType> = async (data) => {
    setLoading(true);
    try {
        reset({ otp: "" });
        const response = await sendOtpApi({ ...data, source: 1 });
        setLoading(false);
        setOtpSent(true);
        setGuestId(response.guest_id);
        localStorage.setItem('guest_id', response.guest_id);
        setShow(true);
        setSuccessMsg(Text.OTP_SENT_SUCCESS + (signUpMethod === SignUpMethod.PHONE ? Text.SMS : Text.EMAIL));
        setErrorMsg("");
        setResendOtpEnabled(false);
        setTimer(Timer.DEFAULT);
        onContinue(); 
    } 
    catch (error) {
        console.log(error);
        setLoading(false);
        setShow(true);
        setSuccessMsg("");
        setErrorMsg("You've already registered with this "+(signUpMethod === SignUpMethod.PHONE ? Text.PHONE : Text.EMAIL)+". Please try logging in");
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
      setSuccessMsg(Text.USER_PROFILE_CREATED);
      // Save tokens and user data to local storage
      localStorage.setItem("accessToken", response.access_token);
      localStorage.setItem("refreshToken", response.refresh_token);
      localStorage.setItem("userName", response.first_name);
      localStorage.setItem("identifier", response.identifier);
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
      setErrorMsg(Text.FAILED_TO_CREATE_PROFILE);
    }
  };

  const verifyOtp: SubmitHandler<SignUpFormType> = async () => {
    setLoading(true);
    try {
      const response = await verifyOtpApi(guestId, otp);
      setLoading(false);
      setOtpVerified(true);
      setShow(true);
      setSuccessMsg(Text.OTP_VERIFICATION_SUCCESS);
      setErrorMsg("");
      reset();
      const verificationCode = response.verification_code; 
      setVerificationCode(verificationCode); 
      setIsSignup(true);
      await createUserProfile(verificationCode); 
    } catch (error) {
      console.log(error);
      setLoading(false);
      // setShow(true);
      setSuccessMsg("");
      // setErrorMsg(Text.OTP_VERIFICATION_FAILED);
      setOtpError(true); // Set OTP error state on failure
      setOtp(""); // Clear OTP input on error
    }
  };

  const resendOtp = async () => {
    setLoading(true);
    try {
      await resendOtpApi({ identifier: watchContactInfo });
      setLoading(false);
      setSeverity(Severity.SUCCESS);
      setShow(true);
      setSuccessMsg(
        Text.RESEND_OTP_SUCCESS +
          (signUpMethod === SignUpMethod.PHONE ? Text.SMS : Text.EMAIL),
      );
      setErrorMsg("");
      setResendOtpEnabled(false);
      setTimer(Timer.DEFAULT);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setSeverity(Severity.ERROR);
      setSuccessMsg("");
      setErrorMsg(Text.FAILED_TO_RESEND_OTP);
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
      setErrorMsg(Text.SESSION_EXPIRED);
      navigate(ROUTES.SIGNUP); // Redirect to signup page on failure
    }
  }, [refreshToken, navigate]);

  useEffect(() => {
    if (accessToken) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    }
  }, [accessToken]);

  useEffect(() => {
    const interval = setInterval(() => {
      refreshAccessToken();
    }, Timer.TOKEN_REFRESH_INTERVAL); // Refresh token every 15 minutes

    return () => clearInterval(interval);
  }, [refreshAccessToken]);

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        setShow(false);
      }, Timer.ALERT_DISPLAY);
      return () => clearTimeout(timer);
    }
  }, [show]);

  const handleClose = () => {
    setShow(false);
  };

  const maskEmail = (email: string) => {
    const [user, domain] = email.split("@");
    const visiblePart = user.slice(0, Masking.VISIBLE_EMAIL_PART);
    const maskedPart = Masking.CHAR.repeat(
      user.length - Masking.VISIBLE_EMAIL_PART,
    );
    return visiblePart + maskedPart + "@" + domain;
  };

  const maskPhoneNumber = (phone: string) => {
    return phone.slice(0, 2) + Masking.CHAR.repeat(6) + phone.slice(-2);
  };
  const getAlternativeMethod = () => {
    return signUpMethod === SignUpMethod.PHONE
      ? SignUpMethod.EMAIL
      : SignUpMethod.PHONE;
  };

  const getAlternativeMethodText = () => {
    return signUpMethod === SignUpMethod.PHONE ? Text.EMAIL1 : Text.PHONE;
  };

  const handleToggleLoginMethod = () => {
    setOtpSent(false);
    reset();
    setSignUpMethod(getAlternativeMethod());
  };

  return (
    <>
      <CustomAlert
        className={`alert-trans ${show ? "show-alert" : ""}`}
        severity={successMsg ? Severity.SUCCESS : Severity.ERROR}
        message={successMsg || errorMsg}
        alertTitle={successMsg ? "Success" : "Error"}
        onClose={handleClose}
      />
      {!otpSent ? (
        <form onSubmit={handleSubmit(sendOtp)}>
          <div className="mb-4">
            <label className="block font-bold text-lg pb-1">
              {Text.YOUR_NAME}
            </label>
            <input
              type="text"
              className={`block w-full p-2 border rounded ${errors.first_name ? "border-red-500" : "border-gray-300"}`}
              {...register("first_name")}
              placeholder={Text.FIRST_LAST_NAME}
            />
            {errors.first_name && (
              <span className="text-red-500 text-sm">
                {errors.first_name?.message}
              </span>
            )}
          </div>

          <div className="mb-4">
            <label className="block font-bold text-lg pb-1">
              {Text.ENTER_PHONE_OR_EMAIL}
            </label>
            <input
              type="text"
              className={`block w-full p-2 border rounded ${errors.identifier ? "border-red-500" : "border-gray-300"}`}
              {...register("identifier")}
              placeholder={Text.ENTER_PHONE_EMAIL}
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
            {Text.CONTINUE}
          </button>
          <div className="mt-4 text-sm">
            <p>
              By continuing, you agree to Ecoyaan’s{" "}
              <Link to={ROUTES.TERMS_OF_USE} className="text-blue-500">
                {Text.TERMS_OF_USE}
              </Link>{" "}
              and{" "}
              <Link to={ROUTES.PRIVACY_POLICY} className="text-blue-500">
                {Text.PRIVACY_POLICY}
              </Link>
            </p>
          </div>
        </form>
      ) : (
        <form onSubmit={handleSubmit(verifyOtp)}>
          <div className="mb-4">
            <label>
              {Text.VERIFICATION_CODE_SENT}{" "}
              {signUpMethod === SignUpMethod.PHONE ? Text.SMS : Text.EMAIL}{" "}
              {maskedContact}
            </label>
            <br />
            <OTPInput
              length={6}
              onChange={handleOtpChange}
              hasError={otpError}
            />
            {otpError && (
              <span className="text-red-500 text-sm">
                {Text.OTP_VERIFICATION_FAILED}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-4 mt-4">
            <button type="submit" className="w-full py-2 bg-green-500 text-white rounded mt-4 hover:bg-green-600">
              {Text.CONTINUE}
            </button>
            {resendOtpEnabled ? (
              <button type="button" onClick={resendOtp} className="bg-gray-200 text-gray-800 py-2 rounded hover:bg-gray-300" disabled={loading} >
                {Text.RESEND_OTP}
              </button>
            ) : (
              <p>
                {Text.RESEND_OTP_IN} {timer} {Text.SECONDS}
              </p>
            )}
          </div>
          <div className="mt-4 text-center text-sm">
            <p>
              {Text.SIGNUP_USING}{" "}
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

export default SignUpForm;
