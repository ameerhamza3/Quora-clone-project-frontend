import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserDataById } from "../services/profileService";
import UserProfile from "../components/about/userProfile";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const { userId } = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getUserDataById(userId);
        setUserData(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [userId]);

  const handleUserDataUpdate = (updatedUserData) => {
    setUserData(updatedUserData);
  };

  return (
    <div>
      {userData && (
        <div style={{ marginTop: "80px" }}>
          <UserProfile userData={userData} onUpdate={handleUserDataUpdate} />
        </div>
      )}
    </div>
  );
};

export default Profile;
