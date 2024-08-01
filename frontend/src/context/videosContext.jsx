import axios from "axios";
import { createContext, useState } from "react";

const VideoContext = createContext();

const VideoProvider = ({ children }) => {
  const [videos, setVideos] = useState([]);
  const [singleVideo, setSingleVideo] = useState({});
  const [trendingVideos, setTrendingVideos] = useState([]);
  const [message, setMessage] = useState(null);

  const getAllVideos = async () => {
    try {
      setMessage(null);
      const response = await axios.get(`http://localhost:3000/api/videos`);
      if (response.data.length === 0) {
        return setMessage("0 Videos");
      }
      setVideos(response.data);
    } catch (error) {
      setMessage(`Error while fetching videos`);
    }
  };

  const getVideoById = async (videoId) => {
    try {
      setMessage(null);
      const response = await axios.get(
        `http://localhost:3000/api/video/${videoId}`
      );

      if (response.data.error === "Video Not Found") {
        setSingleVideo({});
        setMessage("Video not found");
      } else {
        setSingleVideo(response.data);
        setMessage(null);
      }
    } catch (error) {
      setMessage(
        `Error while fetching single video: ${error.message} (videoId: ${videoId})`
      );
    }
  };

  const getTrendingVideos = async () => {
    try {
      setMessage(null);
      const response = await axios.get(`http://localhost:3000/api/trending`);
      if (response.data.length === 0) {
        return setMessage("0 Videos");
      }
      setTrendingVideos(response.data);
    } catch (error) {
      setMessage(`Error while fetching trending videos`);
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
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};

export { VideoContext, VideoProvider };
