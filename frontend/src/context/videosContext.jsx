import axios from "axios";
import { createContext, useId, useState } from "react";

const apiUrl = import.meta.env.VITE_API_URL;

const VideoContext = createContext();

const VideoProvider = ({ children }) => {
  //take the userId to get the user video
  const [user, setUser] = useState({});

  // setUserId
  const [userId, setUserId] = useState("");

  //Single user videos
  const [userVideos, setUserVideos] = useState([]);

  const [videos, setVideos] = useState([]);
  const [singleVideo, setSingleVideo] = useState({});
  const [trendingVideos, setTrendingVideos] = useState([]);
  const [message, setMessage] = useState(null);

  const getAllVideos = async () => {
    try {
      setMessage(null);
      const response = await axios.get(`${apiUrl}/videos`);
      if (response.data.length === 0) {
        return setMessage("0 Videos");
      }
      setVideos(response.data);
    } catch (error) {
      setMessage("Error while fetching videos");
    }
  };

  const getVideoById = async (videoId) => {
    try {
      setMessage(null);
      const response = await axios.get(`${apiUrl}/video/${videoId}`);

      if (response.data.error === "Video Not Found") {
        setSingleVideo({});
        setMessage("Video not found");
      } else {
        setSingleVideo(response.data);
        setMessage(null);
      }
    } catch (error) {
      setMessage(`Video not found`);
    }
  };

  const getTrendingVideos = async () => {
    try {
      setMessage(null);
      const response = await axios.get(`${apiUrl}/trending`);
      if (response.data.length === 0) {
        return setMessage("0 Videos");
      }
      setTrendingVideos(response.data);
    } catch (error) {
      setMessage("Error while fetching trending videos");
    }
  };

  // get Video by userID
  const getVideoByUserId = async () => {
    setMessage(null);

    const token = localStorage.getItem("authToken");
    if (!token) {
      return setMessage("Please Login");
    }

    try {
      const userResponse = await axios.get(`${apiUrl}/profile`, {
        headers: { "auth-Token": token },
      });
      setUser(userResponse.data);
      const userId = userResponse.data.user_id;
      if (!userId) {
        return setMessage("Please Login");
      }

      const response = await axios.get(`${apiUrl}/uservideo/${userId}`);
      setUserVideos(response.data);
    } catch (error) {
      setMessage("Something went wrong while fetching your videos " + error);
      return;
    }
  };

  // Helper function to format views count
  const formatViews = (views) => {
    if (views == null || isNaN(views)) return "0"; // Handle undefined or non-numeric values
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}k`;
    } else {
      return views.toString();
    }
  };

  const getUserId = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      return alert("Please Login");
    }

    try {
      const response = await axios.get(`${apiUrl}/getuserid`, {
        headers: { "auth-Token": token },
      });

      if (response && response.data) {
        setUserId(response.data);
      } else {
        console.error("Unexpected response structure", response);
      }
    } catch (error) {
      console.error("Error fetching user ID", error);
      alert("An error occurred while fetching user ID.");
    }
  };

  // Like and Dislike videos
  const toggleVideoLikeStatus = async (userId, videoId) => {
    try {
      await axios.post(`${apiUrl}/likevideo`, {
        userId,
        videoId,
      });
    } catch (error) {
      alert("Please login " + error.message);
    }
  };

  const checkLike = async (userId, videoId, setIsLiked) => {
    if (!userId || !videoId) {
      return alert("Data not found");
    }
    try {
      const response = await axios.get(`${apiUrl}/getlikevideo`, {
        params: { userId, videoId },
      });
      setIsLiked(response.data);
    } catch (error) {
      alert("Something went wrong " + error.message);
    }
  };

  return (
    <VideoContext.Provider
      value={{
        getAllVideos,
        videos,
        message,
        getVideoById,
        singleVideo,
        trendingVideos,
        getTrendingVideos,
        getVideoByUserId,
        userVideos,
        user,
        formatViews,
        toggleVideoLikeStatus,
        getUserId,
        checkLike,
        userId,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};

export { VideoContext, VideoProvider };
