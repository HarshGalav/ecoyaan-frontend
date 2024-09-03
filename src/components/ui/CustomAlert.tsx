import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";
import AlertTitle from "@mui/material/AlertTitle";

interface AlertProps {
  severity: "success" | "error" | "warning" | "info";
  message: string | null;
  alertTitle: string;
  onClose?: () => void;
  className: string;
}

function CustomAlert({
  severity,
  message,
  alertTitle,
  onClose,
  className,
}: AlertProps) {
  return (
    <Alert
      className={className}
      variant="filled"
      severity={severity}
      onClose={onClose}
    >
      <AlertTitle>{alertTitle}</AlertTitle>
      {message}
    </Alert>
  );
}

export default CustomAlert;
