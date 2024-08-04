import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth/authContext";

const Login = () => {
  const { login, setEmail, setPassword, error, setError } =
    useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      login();
      navigate("/profile");
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center pt-10">
      <form
        onSubmit={handleLogin}
        className="flex flex-col justify-center px-8 py-5 rounded shadow shadow-slate-950 hover:shadow-gray-600 hover:shadow-md transition-all duration-300 ease-in-out transform md:w-80 w-2/3"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <label htmlFor="email" className="mb-2 font-semibold">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          autoFocus
          className="mb-4 p-2 border border-gray-300 rounded"
          placeholder="Enter your email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password" className="mb-2 font-semibold">
          Password
        </label>
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          id="password"
          required
          className="mb-1 p-2 border border-gray-300 rounded"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <p
          onClick={() => setShowPassword(!showPassword)}
          className="mb-6 cursor-pointer"
        >
          {showPassword ? "Hide Password" : "Show Password"}
        </p>
        {error && <p className="text-red-500 mb-6">{error}</p>}
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Log in
        </button>
      </form>
      <p className="mt-4">
        Don't have an account?{" "}
        <Link to="/register" className="text-blue-500 hover:underline">
          Create one
        </Link>
        .
      </p>
      <p className="mt-2">
        <Link to="/forgot-password" className="text-blue-500 hover:underline">
          Forgot Password?
        </Link>
      </p>
    </div>
  );
};

export default Login;
