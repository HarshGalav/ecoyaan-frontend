import { CircularProgress } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import footer from '../../../../config/Footer.json';
import { ROUTES } from "../../../../utils/Routes";

export default function SubscribePart() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const nav = useNavigate();

  const handleSubscribe = async (e:any) => {
    e.preventDefault();
    if (!email.trim()) {
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        'https://admin-api.ecoyaan.com/v1/guests/subscribe',
        { email: email }
      );
      setEmail('');
      setSuccessMsg("Subscribed successfully");
      setOpen(true);
      setLoading(false);
    } catch (error) {
      console.error('Subscription error:', error);
      setLoading(false);
      setOpen(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setOpen(false);
    }, 5000);
    return () => clearInterval(interval);
  }, [open]);

  return (
    <div className="flex flex-col gap-y-7 xs:w-full xl:w-fit relative xl:pb-8">
      <div className="flex items-center justify-center">
        <div className="flex flex-col gap-y-4 xl:px-2 justify-between items-center w-full">
          <div className="flex flex-col gap-y-5 sm:w-full 2xl:w-full">
            <h1 className="xs:text-base md:text-xl font-bold">{footer.subscribe.title}</h1>
            <p className="xs:text-sm md:text-xs text-[#454545]">
              {footer.subscribe.description}
            </p>
          </div>
          <div className="flex flex-col xs:w-full gap-y-4 xl:w-full">
            <form onSubmit={handleSubscribe}>
              <input
                type="email"
                className="rounded-3xl sm:w-2/3 xl:w-full p-2 px-4 outline-none text-base"
                required
                placeholder={footer.subscribe.emailPlaceholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <p className="text-xs px-2 flex gap-x-1 mt-2">
                {footer.subscribe.notificationText}<br />
                <Link to={ROUTES.PRIVACY_POLICY} className="text-blue-500">
                  {footer.subscribe.privacyPolicyText}
                </Link>
              </p>
              <button
                type="submit"
                className="bg-primary py-2 md:px-6 xs:px-6 rounded-3xl text-sm text-white md:font-semibold mt-4"
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : footer.subscribe.subscribeButtonText}
              </button>
            </form>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Collapse in={open}>
                <Alert
                  iconMapping={{
                    success: <CheckCircleOutlineIcon sx={{ mt: 0.3 }} />,
                  }}
                  sx={{
                    backgroundColor: "transparent",
                    fontSize: "1.2rem",
                    marginRight: "0",
                  }}
                >
                  {successMsg}
                </Alert>
              </Collapse>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
