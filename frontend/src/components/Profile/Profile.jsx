import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/auth/authContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const { profile, user, error } = useContext(AuthContext);

  useEffect(() => {
    profile();
  }, []);

  return (
    <div>
      <h1>Hello {user.name}</h1>
      {error && <p>{error}</p>}
      <button
        onClick={() => {
          localStorage.removeItem("authToken");
          navigate("/login");
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
