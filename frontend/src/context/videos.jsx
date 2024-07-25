import axios from "axios";
import { createContext, useState } from "react";

const VideoContext = createContext();

const VideoProvider = ({ children }) => {
  const [videos, setVideo] = useState([]);
  const [message, setMessage] = useState(null);

  const getAllVideos = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/videos`);
      setVideo(response.data);
      if (!videos) {
        setMessage("Zero Videos");
      }
    } catch (error) {
      setMessage(`Error while feching videos`);
    }
  };

  return (
    <VideoContext.Provider
      value={{ VideoProvider, getAllVideos, videos, message }}
    >
      {children}
    </VideoContext.Provider>
  );
};

export { VideoContext, VideoProvider };
