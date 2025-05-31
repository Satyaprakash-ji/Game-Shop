import { Link, NavLink, useNavigate } from "react-router-dom";
import "./NavigationBar.css"
import { useContext } from "react";
import { FilterDispatchContext } from "../../contexts/FilterContext";
import { FilterContext } from "../../contexts/FilterContext";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { Tooltip as ReactTooltip } from 'react-tooltip'
import { AuthContext } from "../../contexts/AuthContext";
import { CartContext } from "../../contexts/CartContext";
import { WishlistContext } from "../../contexts/WishlistContext";

const NavigationBar = () => {

    const { searchFilteredProduct } = useContext(FilterContext)
    const { filterDispatch } = useContext(FilterDispatchContext)
    const { loginData, logOut } = useContext(AuthContext)
    const navigate = useNavigate();
    const { wishlist } = useContext(WishlistContext)
    const { cart } = useContext(CartContext);

    const handleSearchFilterChange = (event) => {
        filterDispatch({
            type: "SEARCH_FILTER_CHANGE",
            payload: event.target.value,
        })
    }

    const handleInputReset = (event) => {
        filterDispatch({
            type: "CLEAR_FILTER_CHANGE",
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
                <div className="input-box">
                    <IoSearch className="search-icon"/>
                    <input className="search-input" type="search" placeholder="Search Games" name="search" onChange={handleSearchFilterChange} />
                </div>
                { searchFilteredProduct.length > 0 && <div className="all-searches" >
                    {searchFilteredProduct.map((search, index) => (
                    <Link to={`/products/${search._id}`} onClick={(e) => handleInputReset(e)} key={index} className="search-box-link">
                        <img className="search-images" src={search.img} alt="" />
                        <span>{search.title}</span>
                    </Link>
                ))}
                </div>}
            </div>
            <div className="right-part">
                { loginData.isLoggedIn ? <p className="navbar-link"><span onClick={() => navigate("/profile")}>Profile</span>/<span onClick={() => logOut()}>LogOut</span></p> : <p className="navbar-link"><span onClick={() => navigate("/login")}>Login</span>/<span onClick={() => navigate("/register")}>Register</span></p> }
                <div className="wishlist-box">
                    <IoMdHeartEmpty size={24} className="wishlist-icon" onClick={() => navigate("/wishlist")}/>
                    {wishlist.wishlistData.length > 0 && <span className="wishlist-total">{wishlist.wishlistData.length}</span>}
                    
                </div>
                <ReactTooltip />
                <div className="cart-box">
                    <IoCartOutline size={24}  title="Cart" className="shoping-cart-icon" onClick={() => navigate("/cart")}/>
                    {cart.cartData.length > 0 && <span className="cart-total">{cart.cartData.length}</span>}
                </div>
            </div>
        </div>
    )
}

export default NavigationBar;