import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { formatDistanceToNow, parseISO } from "date-fns";
import { useContext, useEffect } from "react";

// Icons
import { BiLike, BiDislike } from "react-icons/bi";

import { VideoContext } from "../../context/videos";

export default function SingleVideo() {
  const { videoId } = useParams();
  const { singleVideo, getVideoById, message } = useContext(VideoContext);

  // get the video
  useEffect(() => {
    const fetchVideo = async () => {
      await getVideoById(videoId);
      console.log(singleVideo);
    };
    fetchVideo();
  }, []);

  // Set the time
  const uploadDate = singleVideo.createdAt
    ? parseISO(singleVideo.createdAt)
    : new Date();
  const timeAgo = formatDistanceToNow(uploadDate, { addSuffix: true });

  return (
    <div className="text-white md:ml-8 px-4 w-full flex flex-wrap flex-col justify-center items-center gap-10">
      <div className="flex flex-col gap-1 w-full max-w-2xl">
        <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
          <ReactPlayer
            url={singleVideo.url}
            controls
            width="100%"
            height="100%"
            style={{ position: "absolute", top: "0", left: "0" }}
          />
        </div>
        <b className="">{singleVideo.title}</b>
        <div className="flex flex-wrap">
          <b className="mr-16">@{singleVideo.uploader_name}</b>
          <b className="flex justify-center gap-2 items-center rounded-l-lg border-r bg-slate-700/[0.5] hover:bg-slate-700/[1] px-2 py-1 cursor-pointer">
            <BiLike className="bg-transparent text-lg" />
            {singleVideo.likes}
          </b>
          <b className="flex justify-center gap-2 items-center rounded-r-lg border-l bg-slate-700/[0.5] hover:bg-slate-700/[1] px-2 py-1 cursor-pointer">
            <BiDislike className="bg-transparent text-lg" />
            {singleVideo.dislikes}
          </b>
        </div>
        <div>
          <p>
            {singleVideo.views} views {timeAgo}
          </p>
          <p>{singleVideo.description}</p>
        </div>
      </div>
    </div>
  );
}
