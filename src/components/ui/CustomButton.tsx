import React, { ReactNode } from "react";
import { CircularProgress } from "@mui/material";

interface Props {
  type?: "button" | "submit" | "reset";
  loading?: boolean;
  fullWidth?: boolean;
  children: ReactNode;
  onClick?: () => void;
}

function CustomButton({ type, loading, fullWidth, children, onClick }: Props) {
  const buttonClass = fullWidth ? "w-full mt-4 btn-green" : "mt-4 btn-green";

  return (
    <button
      type={type}
      className={buttonClass}
      disabled={loading}
      onClick={onClick}
    >
      {children}
      {loading && (
        <CircularProgress
          color="inherit"
          size={24}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            marginTop: "-12px",
            marginLeft: "-12px",
          }}
        />
      )}
    </button>
  );
}

export default CustomButton;
