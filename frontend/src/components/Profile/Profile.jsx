import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/auth/authContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const { profile, user, error } = useContext(AuthContext);

  useEffect(() => {
    profile();
    if (!user) {
      localStorage.removeItem("authToken");
    }
  }, []);

  const handleEditProfile = () => {
    navigate("/edit-profile"); // Adjust the path to your edit profile page
  };

  return (
    <div className="flex flex-col items-center p-4">
      <div className="flex flex-col items-center mb-4">
        <img
          src="https://wallpapers.com/images/featured/cool-profile-pictures-4co57dtwk64fb7lv.jpg"
          alt={user.name}
          className="w-32 h-32 rounded-full shadow-md"
        />
        <p className="mt-2 text-center text-gray-700">{user.bio}</p>
      </div>
      <div className="text-center flex flex-col justify-center">
        <b className="text-xl mb-2">{user.name}</b>
        <div className="flex justify-center space-x-4 mt-4">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600">
            {user.followers} Followers
          </button>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-md shadow hover:bg-green-600"
            onClick={() => navigate("/following")}
          >
            {user.following} Following
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-md shadow hover:bg-red-600"
            onClick={() => navigate("/myvideos")}
          >
            {user.videos} Videos
          </button>
        </div>
        <button
          onClick={handleEditProfile}
          className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded-md shadow hover:bg-yellow-600"
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
