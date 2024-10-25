import { NavLink, useNavigate } from "react-router-dom";
import "./NavigationBar.css"
import { useContext } from "react";
import { FilterDispatchContext } from "../../contexts/FilterContext";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { Tooltip as ReactTooltip } from 'react-tooltip'
import { AuthContext } from "../../contexts/AuthContext";

const NavigationBar = () => {

    const { filterDispatch } = useContext(FilterDispatchContext)
    const { loginData, logOut } = useContext(AuthContext)
    const navigate = useNavigate();

    const handleSearchFilterChange = (event) => {
        filterDispatch({
            type: "SEARCH_FILTER_CHANGE",
            payload: event.target.value,
        })
    }

    return(
        <div className="navigation">
            <div className="left-part">
                <h1>Game Shop</h1>
            </div>
            <div className="center-part">
                    <NavLink to="/" className="navbar-link">Home</NavLink>
                    <NavLink to="/category" className="navbar-link">Shop</NavLink>
                    <NavLink to="/wishlist" className="navbar-link">Wishlist</NavLink>
                    <NavLink to="/contact" className="navbar-link">Contact us</NavLink>
                    <NavLink to="/cart" className="navbar-link">Cart</NavLink>
            </div>
            <div className="search-box">
                <input type="search" placeholder="Search" name="search" onChange={handleSearchFilterChange} />
            </div>
            <div className="right-part">
                { loginData.isLoggedIn ? <p className="navbar-link"><span onClick={() => navigate("/profile")}>Profile</span>/<span onClick={() => logOut()}>LogOut</span></p> : <p className="navbar-link"><span onClick={() => navigate("/login")}>Login</span>/<span onClick={() => navigate("/register")}>Register</span></p> }
                <IoMdHeartEmpty className="wishlist-icon" onClick={() => navigate("/wishlist")}/>
                <ReactTooltip />
                <IoCartOutline  title="Cart" className="shoping-cart-icon" onClick={() => navigate("/cart")}/>
            </div>
        </div>
    )
}

export default NavigationBar;