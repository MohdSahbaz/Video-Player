import axios from "axios";
import { createContext, useState } from "react";

const VideoContext = createContext();

const VideoProvider = ({ children }) => {
  const [videos, setVideos] = useState([]);
  const [singleVideo, setSingleVideo] = useState({});
  const [message, setMessage] = useState(null);

  const getAllVideos = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/videos`);
      if (response.data.length === 0) {
        setMessage("Zero Videos");
      } else {
        setVideos(response.data);
      }
    } catch (error) {
      setMessage(`Error while feching videos`);
    }
  };

  const getVideoById = async (videoId) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/video/${videoId}`
      );
      if (!response.data) {
        setMessage("Video not found");
      } else {
        setSingleVideo(response.data);
      }
    } catch (error) {
      setMessage(`Error while fetching single video`);
    }
  };

  return (
    <VideoContext.Provider
      value={{
        VideoProvider,
        getAllVideos,
        videos,
        message,
        getVideoById,
        singleVideo,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};

export { VideoContext, VideoProvider };
