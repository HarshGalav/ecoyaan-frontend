import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./styles.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  
    <BrowserRouter>
      <AuthProvider children={<App />} />
    </BrowserRouter>
 
);