import axios from "axios";
import { createContext, useState } from "react";

const apiUrl = import.meta.env.VITE_API_URL;

const FollowContext = createContext();

const FollowProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  const setFollow = async (userId, followed_id) => {
    try {
      await axios.post(`${apiUrl}/setfollow`, {
        follower_id: userId,
        followed_id,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const checkFollow = async (userId, uploaderId, setCheckFollowing) => {
    try {
      const response = await axios.post(`${apiUrl}/checkfollow`, {
        follower_id: userId,
        followed_id: uploaderId,
      });
      setCheckFollowing(response.data);
    } catch (error) {
      alert(error.message);
    }
  };

  const getFollow = async (userId) => {
    try {
      if (userId) {
        const response = await axios.get(`${apiUrl}/getfollow/${userId}`);
        setUsers(response.data);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <FollowContext.Provider
      value={{ setFollow, checkFollow, getFollow, users }}
    >
      {children}
    </FollowContext.Provider>
  );
};

export { FollowContext, FollowProvider };
