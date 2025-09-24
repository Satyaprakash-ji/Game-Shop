import { useNavigate } from "react-router-dom";
import "./AdminNavigationBar.css";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { TiThMenuOutline } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";

const AdminNavigationBar = ({toggleMenu, isMenuOpen}) => {
  const { loginData, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="admin-navigation">
      <div className="left-part">
        <div onClick={() => toggleMenu()}>{ isMenuOpen ? <i className="menu-icon" ><RxCross2 /></i> : <i className="menu-icon"><TiThMenuOutline /></i>}</div>
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
