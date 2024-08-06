import axios from "axios";
import { createContext, useState } from "react";

const ForgetPasswordContext = createContext();

const ForgetPasswordProvider = ({ children }) => {
  const [error, setError] = useState(null);

  // Function to get OTP
  const getForgetOTP = async (email) => {
    try {
      setError(null);
      if (email) {
        await axios.post(`http://localhost:3000/api/password/otp`, { email });
        setError("OTP sent successfully");
      } else {
        setError("Please enter your email");
      }
    } catch (error) {
      setError("Failed to send OTP. Please enter a valid email.");
    }
  };

  // Function to forget password
  const forgetPassword = async (email, otp, newPassword) => {
    try {
      setError(null);
      if (email && otp && newPassword) {
        await axios.post(`http://localhost:3000/api/password/forget`, {
          email,
          otp,
          newPassword,
        });
        localStorage.removeItem("authToken");
        alert("Password updated successfully");
      } else {
        setError("Please fill out all fields");
      }
    } catch (error) {
      setError("Failed to update password. Please check your details.");
    }
  };

  // Function to change password with the help of old password
  const changePassword = async (email, oldPassword, newPassword) => {
    try {
      setError(null);
      if (email && oldPassword && newPassword) {
        await axios.post(`http://localhost:3000/api/password/change`, {
          email,
          oldPassword,
          newPassword,
        });
        localStorage.removeItem("authToken");
        alert("Password changed successfully");
      } else {
        setError("Please fill out all fields");
      }
    } catch (error) {
      setError("Failed to change password. Please check your details.");
    }
  };

  return (
    <ForgetPasswordContext.Provider
      value={{ getForgetOTP, forgetPassword, changePassword, error, setError }}
    >
      {children}
    </ForgetPasswordContext.Provider>
  );
};

export { ForgetPasswordContext, ForgetPasswordProvider };
