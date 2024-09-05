import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/auth/authContext";
import { VideoContext } from "../../context/videosContext";

const WatchLater = () => {
  const { profile, user } = useContext(AuthContext);
  const { message, userVideos } = useContext(VideoContext);

  useEffect(() => {
    profile();
  }, []);

  return (
    <div className="text-white px-4 py-6 md:px-8 md:py-8">
      {message && <b className="text-red-500 text-center">{message}</b>}
      <h1 className="text-2xl font-bold mb-4 md:text-3xl text-center">
        {user.name} Videos
      </h1>
      <div className="flex flex-wrap gap-6 md:gap-8 justify-center items-start">
        {userVideos.map((video) => {
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
    </div>
  );
};

export default WatchLater;
