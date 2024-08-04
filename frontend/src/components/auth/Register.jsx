import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth/authContext";

const Register = () => {
  const { register, setName, setEmail, setPassword, error } =
    useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    await register();
    navigate("/login");
  };

  return (
    <div className="flex flex-col justify-center items-center pt-4 pb-2">
      <form
        onSubmit={handleLogin}
        className="flex flex-col justify-center px-8 py-1 pb-3 rounded shadow hover:shadow-md shadow-slate-950 hover:shadow-gray-600 w-80 transition-all duration-300 ease-in-out transform"
      >
        <h1 className="text-2xl font-bold text-center mb-2">Register</h1>
        <label
          htmlFor="profileImage"
          className="mb-2 font-semibold text-gray-600"
        >
          Profile Image
        </label>
        <input
          type="file"
          name="profileImage"
          id="profileImage"
          className="mb-4 opacity-50 cursor-pointer"
        />
        <label htmlFor="name" className="mb-2 font-semibold text-gray-600">
          User Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          autoFocus
          className="mb-4 p-2 border border-gray-300 rounded"
          placeholder="Enter your user name"
          required
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="email" className="mb-2 font-semibold text-gray-600">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="mb-4 p-2 border border-gray-300 rounded"
          placeholder="Enter your email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password" className="mb-2 font-semibold text-gray-600">
          Password
        </label>
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          id="password"
          minLength={6}
          required
          className="mb-1 p-2 border border-gray-300 rounded"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <p
          onClick={() => setShowPassword(!showPassword)}
          className="cursor-pointer text-blue-500 hover:underline mb-6"
        >
          {showPassword ? "Hide Password" : "Show Password"}
        </p>
        {error && <p className="text-red-500 mb-6">{error}</p>}
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Create Account
        </button>
      </form>
      <p className="mt-2">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-500 hover:underline">
          Login
        </Link>
        .
      </p>
    </div>
  );
};

export default Register;
