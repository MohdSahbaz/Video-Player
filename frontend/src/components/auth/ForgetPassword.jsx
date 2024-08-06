import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ForgetPasswordContext } from "../../context/auth/forgetPassword";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const { getForgetOTP, forgetPassword, setError, error } = useContext(
    ForgetPasswordContext
  );
  const handleLogin = async (e) => {
    e.preventDefault();
    if (email && otp && newPassword) {
      try {
        await forgetPassword(email, otp, newPassword);
        navigate("/login");
      } catch (error) {
        setError("Somthing went wrong");
      }
    } else {
      setError("Enter all field");
    }
  };

  const getOtp = async () => {
    if (email) {
      try {
        await getForgetOTP(email);
      } catch (error) {
        setError("Somthing went wrong");
      }
    } else {
      setError("Enter email");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center py-3 ">
      <form
        onSubmit={handleLogin}
        className="flex flex-col justify-center px-8 py-3 rounded shadow shadow-slate-950 hover:shadow-gray-600 hover:shadow-md transition-all duration-300 ease-in-out transform md:w-80 w-2/3"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Forgot Password</h1>
        <label htmlFor="email" className="mb-2 font-semibold text-gray-600">
          Email<span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          name="email"
          id="email"
          autoFocus
          className="mb-2 p-2 border border-gray-300 rounded"
          placeholder="Enter your email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <p
          onClick={getOtp}
          className="bg-slate-700 text-gray-400 text-center py-1 px-1 rounded hover:bg-slate-800 transition-all duration-300 cursor-pointer"
        >
          Sent OTP
        </p>
        <label htmlFor="otp" className="mb-2 font-semibold text-gray-600">
          OTP<span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="otp"
          id="otp"
          required
          className="mb-1 p-2 border border-gray-300 rounded"
          placeholder="Enter OTP"
          onChange={(e) => setOTP(e.target.value)}
        />
        <label htmlFor="password" className="mb-2 font-semibold text-gray-600">
          New Password<span className="text-red-500">*</span>
        </label>
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          id="password"
          required
          className="mb-1 p-2 border border-gray-300 rounded"
          placeholder="Enter your password"
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <p
          onClick={() => setShowPassword(!showPassword)}
          className="mb-2 cursor-pointer"
        >
          {showPassword ? "Hide Password" : "Show Password"}
        </p>
        <p className="mb-4 flex justify-end">
          <Link to="/change-password" className="text-blue-500 hover:underline">
            Try another way
          </Link>
        </p>
        {error && <p className="text-red-500 mb-6">{error}</p>}
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-all duration-300"
        >
          Update
        </button>
      </form>
      {!localStorage.getItem("authToken") && (
        <p className="mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Create one
          </Link>
          .
        </p>
      )}
    </div>
  );
};

export default ForgetPassword;
