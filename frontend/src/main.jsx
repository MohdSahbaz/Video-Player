import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// Context Providers
import { VideoProvider } from "./context/videosContext.jsx";
import { AuthProvider } from "./context/auth/authContext.jsx";
import { ForgetPasswordProvider } from "./context/auth/forgetPassword.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <VideoProvider>
      <AuthProvider>
        <ForgetPasswordProvider>
          <App />
        </ForgetPasswordProvider>
      </AuthProvider>
    </VideoProvider>
  </React.StrictMode>
);
