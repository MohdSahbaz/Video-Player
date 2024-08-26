import axios from "axios";
import { createContext, useState } from "react";

const apiUrl = import.meta.env.VITE_API_URL;

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [singleUser, setSingleUser] = useState(null);

  const getUserByName = async (username) => {
    setError(null);
    setSingleUser(null);
    try {
      const response = await axios.post(`${apiUrl}/getuserbyname`, {
        username,
      });
      setSingleUser(response.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError("User not found.");
      } else {
        setError(`Error while getting user data: ${error.message}`);
      }
    }
  };

  return (
    <UserContext.Provider value={{ getUserByName, error, singleUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
