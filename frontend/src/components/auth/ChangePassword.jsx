import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ForgetPasswordContext } from "../../context/auth/forgetPassword";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const { changePassword, setError, error } = useContext(ForgetPasswordContext);
  const handleLogin = async (e) => {
    e.preventDefault();
    if ((email, oldPassword, newPassword)) {
      try {
        await changePassword(email, oldPassword, newPassword);
        navigate("/login");
      } catch (error) {
        setError("Somthing went wrong");
      }
    } else {
      setError("Enter all field");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center py-3 ">
      <form
        onSubmit={handleLogin}
        className="flex flex-col justify-center px-8 py-3 rounded shadow shadow-slate-950 hover:shadow-gray-600 hover:shadow-md transition-all duration-300 ease-in-out transform md:w-80 w-2/3"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Change Password</h1>
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
        <label
          htmlFor="oldPassword"
          className="mb-2 font-semibold text-gray-600"
        >
          Old Password<span className="text-red-500">*</span>
        </label>
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          id="oldPassword"
          required
          className="mb-1 p-2 border border-gray-300 rounded"
          placeholder="Enter your old password"
          onChange={(e) => setOldPassword(e.target.value)}
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
          placeholder="Enter your new password"
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <p
          onClick={() => setShowPassword(!showPassword)}
          className="mb-2 cursor-pointer"
        >
          {showPassword ? "Hide Password" : "Show Password"}
        </p>
        <p className="mb-4 flex justify-end">
          <Link to="/forgot-password" className="text-blue-500 hover:underline">
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

export default ChangePassword;
