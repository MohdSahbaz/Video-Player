import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { formatDistanceToNow, parseISO } from "date-fns";

import { VideoContext } from "../../context/videosContext";

const Trending = () => {
  const navigate = useNavigate();
  const { trendingVideos, getTrendingVideos, message, formatViews } =
    useContext(VideoContext);

  useEffect(() => {
    const fetchVideos = async () => {
      await getTrendingVideos();
    };
    fetchVideos();
  }, []);

  const handleSingleVideo = (videoId) => {
    navigate(`/watch?video=${videoId}`);
  };

  return (
    <div className="text-white px-4 py-6 md:px-8 md:py-8">
      {message && <p className="text-red-500 mb-4">{message}</p>}
      {trendingVideos.length === 0 ? (
        <p className="text-gray-500">No trending videos available.</p>
      ) : (
        <div className="flex flex-wrap gap-6 md:gap-8 justify-center">
          {trendingVideos.map((video) => {
            const uploadDate = video.createdAt
              ? parseISO(video.createdAt)
              : new Date();
            const timeAgo = video.createdAt
              ? formatDistanceToNow(uploadDate, { addSuffix: true })
              : "Unknown time";
            const formattedViews = formatViews(video.views);

            return (
              <div
                key={video.video_id}
                className="flex flex-col items-center bg-gray-800 p-4 rounded-lg shadow-lg cursor-pointer hover:bg-gray-700 transition-colors duration-300"
                onClick={() => handleSingleVideo(video.video_id)}
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-40 object-cover rounded-lg mb-2"
                />
                <div className="text-center">
                  <p className="text-lg font-semibold mb-1">{video.title}</p>
                  <p className="text-sm text-gray-400 mb-1">
                    @{video.uploader_name}
                  </p>
                  <p className="text-xs text-gray-300">
                    {`${formattedViews} views`} {" - "} {timeAgo}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Trending;
