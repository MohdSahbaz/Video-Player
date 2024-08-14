import { useSearchParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { formatDistanceToNow, parseISO } from "date-fns";
import { BiLike, BiSolidLike, BiDislike } from "react-icons/bi";
import { MdOutlinePlaylistAdd, MdOutlineWatchLater } from "react-icons/md";
import { useContext, useEffect, useState } from "react";
import { VideoContext } from "../../context/videosContext";

export default function SingleVideo() {
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("video");
  // const [userId, setUserId] = useState(null);
  const {
    singleVideo,
    getVideoById,
    message,
    formatViews,
    toggleVideoLikeStatus,
    getUserId,
    checkLike,
    userId,
  } = useContext(VideoContext);
  const [liked, setLiked] = useState(false);
  const [isLiked, setIsLiked] = useState();
  const [loading, setLoading] = useState(true);

  const handleLike = async () => {
    if (userId) {
      await toggleVideoLikeStatus(userId, videoId);
      setLiked(!liked);
    }
  };

  // Get the video
  useEffect(() => {
    const fetchVideo = async () => {
      if (videoId) {
        try {
          await getUserId();
          await getVideoById(videoId);
          if (userId) {
            await checkLike(userId, videoId, setIsLiked);
          }
        } catch (error) {
          console.error("Error fetching video:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchVideo();
  }, [userId, videoId, liked]);

  // Set the time
  const uploadDate = singleVideo?.createdAt
    ? parseISO(singleVideo.createdAt)
    : new Date();
  const timeAgo = formatDistanceToNow(uploadDate, { addSuffix: true });
  const formattedViews = formatViews(singleVideo?.views || 0); // Handle undefined views

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-4 border-t-4 border-violet-500 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="text-white md:ml-8 px-4 flex flex-wrap flex-col py-5 md:py-8 items-center gap-10">
      {singleVideo && singleVideo.url ? (
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
          <b>{singleVideo.title}</b>
          <div className="flex flex-wrap items-center">
            <b className="mr-2 px-2 py-1 bg-cyan-900 hover:bg-cyan-950 rounded cursor-pointer">
              @{singleVideo.uploader_name}
            </b>
            <b className="mr-2 bg-violet-800 hover:bg-violet-900 rounded px-4 py-1 cursor-pointer">
              Follow
            </b>
            <div className="flex flex-nowrap py-1">
              <b
                onClick={() => handleLike()}
                className="flex justify-center gap-2 items-center rounded-l-lg border-r bg-slate-700/[0.5] hover:bg-slate-700/[1] px-2 py-1 cursor-pointer"
              >
                {!isLiked ? (
                  <BiLike className="bg-transparent text-lg" />
                ) : (
                  <BiSolidLike className="bg-transparent text-lg text-red-600" />
                )}
                {singleVideo.likes}
              </b>
              <b className="flex justify-center gap-2 items-center rounded-r-lg border-l bg-slate-700/[0.5] hover:bg-slate-700/[1] px-2 py-1 cursor-pointer">
                <BiDislike className="bg-transparent text-lg" />
                {singleVideo.dislikes}
              </b>
            </div>
          </div>
          <div className="flex flex-nowrap">
            <b className="flex justify-center items-center bg-slate-700/[0.5] hover:bg-slate-700/[1] cursor-pointer gap-2 px-4 py-1 border-r rounded-l-md">
              <MdOutlinePlaylistAdd className="bg-transparent md:text-2xl text-xl" />
              Playlist
            </b>
            <b className="flex justify-center items-center bg-slate-700/[0.5] hover:bg-slate-700/[1] cursor-pointer gap-2 px-4 py-1 border-l rounded-r-md">
              <MdOutlineWatchLater className="bg-transparent md:text-2xl text-xl" />
              Watch Later
            </b>
          </div>
          <div>
            <p>
              {formattedViews} views {timeAgo}
            </p>
            <p>{singleVideo.description}</p>
          </div>
        </div>
      ) : (
        <p>{message}</p>
      )}
    </div>
  );
}
