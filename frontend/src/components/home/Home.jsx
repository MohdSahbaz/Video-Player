import { useContext, useEffect } from "react";
import { formatDistanceToNow, parseISO } from "date-fns";

import { VideoContext } from "../../context/videos";

const Home = () => {
  const { videos, getAllVideos, message } = useContext(VideoContext);

  useEffect(() => {
    getAllVideos();
  }, []);

  return (
    <div className="text-white md:ml-8 px-4 w-full flex flex-wrap justify-center gap-10">
      <b>{message}</b>
      {videos.map((video, index) => {
        const uploadDate = parseISO(video.createdAt);
        const timeAgo = formatDistanceToNow(uploadDate, { addSuffix: true });

        return (
          <div key={index} className="md:w-60">
            <div>
              <img
                src={video.thumbnail}
                alt={video.title}
                className="rounded md:h-auto md:w-60"
              />
            </div>
            <div>
              <b>{video.title}</b>
              <p>{video.uploader_id}</p>
              <p>
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
