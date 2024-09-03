import React, {
  useState,
  ClipboardEvent,
  ChangeEvent,
  KeyboardEvent,
  useEffect,
  useRef,
} from "react";

interface OTPInputProps {
  length: number;
  onChange: (otp: string) => void;
  hasError?: boolean; // Prop to indicate error state
}

const OTPInput: React.FC<OTPInputProps> = ({ length, onChange, hasError }) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
  const inputRefs = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    if (hasError) {
      setOtp(Array(length).fill("")); // Clear OTP input on error
    }
  }, [hasError, length]);

  useEffect(() => {
    inputRefs.current[0]?.focus(); // Focus the first input on initial render or on error
  }, []);

  const handleChange = (element: HTMLInputElement, index: number) => {
    const value = element.value.replace(/[^0-9]/g, "");
    if (value.length > 1) {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    onChange(newOtp.join(""));

    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    element: HTMLInputElement,
    index: number,
    event: KeyboardEvent,
  ) => {
    if (event.key === "Backspace" && !element.value && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (event: ClipboardEvent) => {
    const paste = event.clipboardData.getData("text").replace(/[^0-9]/g, "");
    if (paste.length === length) {
      const newOtp = paste.split("").slice(0, length);
      setOtp(newOtp);
      onChange(newOtp.join(""));
      inputRefs.current[length - 1]?.focus();
    }
  };

  return (
    <div className="flex justify-between gap-2">
      {otp.map((data, index) => (
        <input
          ref={(el) => (inputRefs.current[index] = el!)}
          key={index}
          type="text"
          className={`w-10 h-10 sm:w-14 sm:h-14 text-center text-lg border rounded-md ${hasError ? "border-red-500" : "border-green-600"}`}
          value={data}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleChange(e.target, index)
          }
          onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
            handleKeyDown(e.currentTarget, index, e)
          }
          onPaste={handlePaste}
          maxLength={1}
        />
      ))}
    </div>
  );
};

export default OTPInput;
