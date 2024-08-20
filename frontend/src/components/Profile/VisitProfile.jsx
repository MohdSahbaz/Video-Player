import { useParams } from "react-router-dom";

const VisitProfile = () => {
  const { username } = useParams();

  return (
    <div>
      <h1>Profile of {username}</h1>
    </div>
  );
};

export default VisitProfile;
