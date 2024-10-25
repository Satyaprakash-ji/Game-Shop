import { useContext, useEffect } from "react";
import "./Profile.css"
import { AiOutlineUser } from "react-icons/ai";
import { AuthContext } from "../../../contexts/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";

const Profile = () => {

    const { loginData, logOut } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
      if (!loginData.isLoggedIn) {
        navigate(location?.state?.from || "/", { replace: true });
      }
    }, [loginData.isLoggedIn]);

    return(
        <div className="profile-container flex-center flex-dir-co">
            <div className="profile-icon">
              <AiOutlineUser size={64} />
            </div>
            <h2 className="user-greeting">Welcome, {loginData?.user?.firstName}!</h2>
            <div className="profile-buttons flex-center">
              <button className="btn-primary" onClick={() => navigate("address")}>
                Manage Addresses
              </button>
              <button className="btn-secondary" onClick={() => logOut()} >
                Log Out
              </button>
            </div>
        </div>
    )
}

export default Profile;