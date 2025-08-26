import { NavLink, useNavigate } from "react-router-dom";
import "./AdminNavigationBar.css";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";

const AdminNavigationBar = () => {
  const { loginData, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="navigation admin-navigation">
      <div className="left-part">
        <h1>Game Shop Admin</h1>
      </div>
      <div className="right-part">
        {loginData.isLoggedIn ? (
          <span className="navbar-link">
            <span>Admin</span> /{" "}
            <span onClick={() => logOut()}>LogOut</span>
          </span>
        ) : (
          <span className="navbar-link">
            <span onClick={() => navigate("/login")}>Login</span> /{" "}
          </span>
        )}
      </div>
    </div>
  );
};

export default AdminNavigationBar;
