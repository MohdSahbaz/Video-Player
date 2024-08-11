import { useRef, useState } from "react";
import { storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const UploadVideo = () => {
  const videoInputRef = useRef(null);
  const thumbnailInputRef = useRef(null);
  const [video, setVideo] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleClickVideo = () => {
    videoInputRef.current.click();
  };

  const handleClickThumbnail = () => {
    thumbnailInputRef.current.click();
  };

  const handleVideoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const storageRef = ref(storage, `videos/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Handle progress if needed
        },
        (error) => {
          console.error("Upload failed:", error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setVideo(downloadURL);
          });
        }
      );
    }
  };

  const handleThumbnailChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const storageRef = ref(storage, `thumbnails/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Handle progress if needed
        },
        (error) => {
          console.error("Upload failed:", error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setThumbnail(downloadURL);
          });
        }
      );
    }
  };

  return (
    <div className="flex pt-2 flex-col items-center">
      <h1 className="text-2xl font-bold mb-4 text-center">Upload Video</h1>
      <div className="flex flex-col md:flex-row justify-evenly items-start mb-4 w-full">
        <div className="flex flex-col items-center mb-4 md:mb-0">
          <div
            onClick={handleClickVideo}
            className="flex justify-center items-center rounded w-[288px] h-[162px] cursor-pointer border p-1 border-dashed mb-4"
          >
            {video ? (
              <video
                src={video}
                className="rounded w-full h-full object-cover"
                controls
              />
            ) : (
              <p className="text-gray-500">Click to upload video</p>
            )}
            <input
              type="file"
              ref={videoInputRef}
              className="hidden"
              required
              accept="video/*"
              onChange={handleVideoChange}
            />
          </div>
          <div
            onClick={handleClickThumbnail}
            className="flex justify-center items-center rounded w-[288px] h-[162px] cursor-pointer border p-1 border-dashed"
          >
            {thumbnail ? (
              <img
                src={thumbnail}
                alt="thumbnail"
                className="rounded w-full h-full object-cover"
              />
            ) : (
              <p className="text-gray-500">Click to upload thumbnail</p>
            )}
            <input
              type="file"
              ref={thumbnailInputRef}
              className="hidden"
              required
              accept="image/*"
              onChange={handleThumbnailChange}
            />
          </div>
        </div>
        <div className="flex flex-col items-start w-[288px]">
          <label className="mb-2 font-medium">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 rounded w-full mb-4 bg-transparent"
            placeholder="Enter video title"
          />
          <label className="mb-2 font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 rounded w-full h-24 resize-none bg-transparent"
            placeholder="Enter video description"
          />
        </div>
      </div>
      <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-4">
        Upload
      </button>
    </div>
  );
};

export default UploadVideo;
