import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col justify-center items-center pt-6">
      <form
        onSubmit={handleLogin}
        className="flex flex-col justify-center px-8 py-5 rounded shadow-md shadow-slate-950 w-80"
      >
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
        <label htmlFor="name" className="mb-2 font-semibold">
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          autoFocus
          className="mb-4 p-2 border border-gray-300 rounded"
          placeholder="Enter your name"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="email" className="mb-2 font-semibold">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="mb-4 p-2 border border-gray-300 rounded"
          placeholder="Enter your email"
          value={email}
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
          minLength={6}
          required
          className="mb-1 p-2 border border-gray-300 rounded"
          placeholder="Enter your password"
          value={password}
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
          Create Account
        </button>
      </form>
      <p className="mt-4">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-500 hover:underline">
          Login
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

export default Register;
