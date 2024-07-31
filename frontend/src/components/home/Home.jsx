import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { formatDistanceToNow, parseISO } from "date-fns";

import { VideoContext } from "../../context/videosContext";

const Home = () => {
  const navigate = useNavigate();
  const { videos, getAllVideos, message } = useContext(VideoContext);

  useEffect(() => {
    const fetchVideo = async () => {
      await getAllVideos();
    };
    fetchVideo();
  }, []);

  const handleSingleVideo = (videoId) => {
    navigate(`/watch?video=${videoId}`);
  };

  return (
    <div className="text-white md:ml-8 px-4 w-full flex flex-wrap justify-center gap-10 py-8">
      {message && <b>{message}</b>}
      {videos.map((video, index) => {
        const uploadDate = parseISO(video.createdAt);
        const timeAgo = formatDistanceToNow(uploadDate, { addSuffix: true });
        return (
          <div
            key={index}
            className="md:w-60 cursor-pointer"
            onClick={() => handleSingleVideo(video.video_id)}
          >
            <div>
              <img
                src={video.thumbnail}
                alt={video.title}
                className="rounded md:h-auto md:w-60"
              />
            </div>
            <div>
              <p>{video.title}</p>
              <p className="text-sm">@{video.uploader_name}</p>
              <p className="text-xs">
                {`${video.views} views`} {" - "} {timeAgo}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
