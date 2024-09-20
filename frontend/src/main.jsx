import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// Context Providers
import { VideoProvider } from "./context/videosContext.jsx";
import { AuthProvider } from "./context/auth/authContext.jsx";
import { ForgetPasswordProvider } from "./context/auth/forgetPassword.jsx";
import { UserProvider } from "./context/user.jsx";
import { FollowProvider } from "./context/follow.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <VideoProvider>
      <AuthProvider>
        <ForgetPasswordProvider>
          <UserProvider>
            <FollowProvider>
              <App />
            </FollowProvider>
          </UserProvider>
        </ForgetPasswordProvider>
      </AuthProvider>
    </VideoProvider>
  </React.StrictMode>
);
