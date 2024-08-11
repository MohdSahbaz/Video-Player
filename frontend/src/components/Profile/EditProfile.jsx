import { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/auth/authContext";

const EditProfile = () => {
  const navigate = useNavigate();
  const { user, updateProfile } = useContext(AuthContext);
  const [newName, setNewName] = useState(user?.name || "");
  const [bio, setBio] = useState(user?.bio || "");

  useEffect(() => {
    // Update state if user data changes
    if (user) {
      setNewName(user.name || "");
      setBio(user.bio || "");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(newName, bio);
      navigate("/profile");
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  return (
    <div className="pt-10 md:px-32 px-5">
      <b>Edit Profile</b>
      <form onSubmit={handleSubmit} className="flex flex-col pt-2">
        <label htmlFor="name" className="mb-2 font-semibold text-gray-600">
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={newName}
          maxLength={30}
          autoFocus
          className="mb-4 p-2 border border-gray-300 rounded bg-transparent"
          placeholder="Enter your name"
          onChange={(e) => setNewName(e.target.value)}
        />
        <label htmlFor="bio" className="mb-2 font-semibold text-gray-600">
          Bio
        </label>
        <input
          type="text"
          name="bio"
          id="bio"
          maxLength={100}
          value={bio}
          className="mb-4 p-2 border border-gray-300 rounded bg-transparent"
          placeholder="Enter your bio"
          onChange={(e) => setBio(e.target.value)}
        />
        <p className="mb-4 flex justify-end">
          <Link to="/forgot-password" className="text-blue-500 hover:underline">
            Forgot Password?
          </Link>
        </p>
        <div className="flex justify-center items-center gap-2">
          <button
            type="button"
            onClick={() => navigate("/profile")}
            className="bg-gray-500 hover:bg-gray-600 py-2 rounded font-bold w-full"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 py-2 rounded font-bold w-full"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
