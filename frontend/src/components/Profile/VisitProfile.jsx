import { useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/user";

const VisitProfile = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const { getUserByName, error, singleUser } = useContext(UserContext);

  console.log(singleUser);

  useEffect(() => {
    if (username) {
      getUserByName(username);
    }
  }, []);

  return (
    <div>
      {singleUser ? (
        <>
          <div className="flex flex-col items-center p-4">
            <img
              src={
                singleUser.picture ||
                "https://wallpapers.com/images/featured/cool-profile-pictures-4co57dtwk64fb7lv.jpg"
              }
              alt={singleUser.name}
              className="w-32 h-32 rounded-full shadow-sm shadow-white"
            />
            <p className="mt-2 text-center text-gray-700">{singleUser.bio}</p>
          </div>
          <div className="text-center flex flex-col justify-center">
            <b className="text-lg mb-2">{singleUser.name}</b>
            <div className="flex justify-center space-x-4 mt-4">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600">
                {singleUser.followers} Followers
              </button>
              <button
                className="px-4 py-2 bg-green-500 text-white rounded-md shadow hover:bg-green-600"
                onClick={() => navigate("/following")}
              >
                {singleUser.following} Following
              </button>
              <button
                className="px-4 py-2 bg-violet-500 text-white rounded-md shadow hover:bg-violet-600"
                onClick={() => navigate(`/${singleUser.name}/videos`)}
              >
                {singleUser.videos} Videos
              </button>
            </div>
          </div>
        </>
      ) : (
        <p>{error}</p>
      )}
    </div>
  );
};

export default VisitProfile;
