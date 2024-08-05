import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth/authContext";

const EditProfile = () => {
  const navigate = useNavigate();
  const { user, updateProfile } = useContext(AuthContext);
  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState(user.bio);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateProfile({ name, bio });
    navigate("/profile");
  };

  return (
    <div className="pt-10 md:px-32 px-5">
      <b>Edit profile</b>
      <form onSubmit={handleSubmit} className="flex flex-col pt-2">
        <label htmlFor="name" className="mb-2 font-semibold text-gray-600">
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          autoFocus
          className="mb-4 p-2 border border-gray-300 rounded"
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="bio" className="mb-2 font-semibold text-gray-600">
          Bio
        </label>
        <input
          type="text"
          name="bio"
          id="bio"
          value={bio}
          className="mb-4 p-2 border border-gray-300 rounded"
          placeholder="Enter your bio"
          onChange={(e) => setBio(e.target.value)}
        />
        <div className="flex justify-center items-center gap-2">
          <button
            onClick={() => navigate("/profile")}
            type="button"
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
