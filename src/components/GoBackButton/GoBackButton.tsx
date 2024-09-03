import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

function GoToBackButton() {
  const navigate = useNavigate();

  return (
    <ArrowBackIcon
      sx={{ fontSize: "2.1rem", cursor: "pointer" }}
      onClick={() => navigate(-1)}
    />
  );
}

export default GoToBackButton;
