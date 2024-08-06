import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);

  const register = async () => {
    setError(null);
    try {
      await axios.post(`http://localhost:3000/api/register`, {
        name,
        bio,
        email,
        password,
      });
    } catch (error) {
      setError(
        `${error.response ? error.response.data.message : error.message}`
      );
    }
  };

  const login = async () => {
    setError(null);
    try {
      localStorage.removeItem("authToken");
      const response = await axios.post(`http://localhost:3000/api/login`, {
        email,
        password,
      });
      localStorage.setItem("authToken", response.data.token);
    } catch (error) {
      setError(
        `${error.response ? error.response.data.message : error.message}`
      );
    }
  };

  const profile = async () => {
    setError(null);
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const response = await axios.get(`http://localhost:3000/api/profile`, {
          headers: { "auth-Token": token },
        });
        setUser(response.data);
      } catch (error) {
        setError(
          `${error.response ? error.response.data.message : error.message}`
        );
      }
    }
  };

  const updateProfile = async (newName, bio) => {
    setError(null);
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const response = await axios.put(
          `http://localhost:3000/api/profile/${user.name}`,
          { newName, bio },
          {
            headers: { "auth-Token": token },
          }
        );
        setUser(response.data.user);
      } catch (error) {
        setError(
          `${error.response ? error.response.data.message : error.message}`
        );
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        register,
        setName,
        setBio,
        setEmail,
        setPassword,
        error,
        setError,
        login,
        profile,
        updateProfile,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
