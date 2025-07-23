import { NavLink, useNavigate, useParams } from "react-router-dom";
import { FaFacebook, FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";
import { IoMdHeartEmpty } from "react-icons/io";
import "./ProductDetails.css"
import { useContext, useEffect, useState } from "react";
import StarRating from "../../components/StarRating/StarRating";
import { CartContext } from "../../contexts/CartContext";
import { WishlistContext } from "../../contexts/WishlistContext";
import { AuthContext } from "../../contexts/AuthContext";
import axiosInstance from "../../utils/axiosInstance";


const ProductDetails = () => {

    const { addToBasketHandler, isItemInBasket } = useContext(CartContext);
    const { addToWishlistHandler } = useContext(WishlistContext);
    const { loginData } = useContext(AuthContext);
    const { productId } = useParams();
    const [currentProduct, setCurrentProduct] = useState(null);
    const navigate = useNavigate();

    const getProductDetails = async () => {
        if (!productId) return;
        try {
            const { data } = await axiosInstance.get(`/api/v1/product/${productId}`);
            setCurrentProduct(data.product)
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getProductDetails();
    }, []);

    const buyNowHandler = (product) => {
        if(isItemInBasket(product._id)){
            navigate("/cart");
        }else{
            addToBasketHandler(product);
            if(loginData.isLoggedIn){
                navigate("/cart");
            }
        }
    }

    return currentProduct ? (
        <div className="product-details-container">
            <div className="product-detail-image">
                <img src={currentProduct?.img} alt="" />
            </div>
            <div className="product-details">
                <h1 className="product-title">{currentProduct?.title}</h1>
                <p className="price">₹{currentProduct?.price}.00 <span className="original-price">₹{currentProduct?.originalPrice?.toLocaleString()}.00</span> <span className="discount-price">{100 - ((currentProduct?.price * 100)/(currentProduct?.originalPrice)).toFixed()}% Off</span></p>
                <div className="rating-details"><StarRating rating={currentProduct?.rating}/> <span>({currentProduct?.rating} rating)</span> </div>
                <p className="product-description">{currentProduct?.aboutGame}</p>
                <div className="quantity-and-button">
                    <button className="add-button" onClick={() => addToBasketHandler( currentProduct)}>Add to Basket</button>
                    <button className="buy-button" onClick={() => buyNowHandler( currentProduct)}>Buy Now</button>
                </div>
                <div className="social-media-icons">
                    <NavLink to="https://www.facebook.com"><span className="icons"><FaFacebook/></span></NavLink>
                    <NavLink to="https://twitter.com/Satyaprakash"><span className="icons"><FaTwitter/></span></NavLink>
                    <NavLink to="https://github.com/Satyaprakash-ji"><span className="icons"><FaGithub/></span></NavLink>
                    <NavLink to="https://www.linkedin.com/in/satyaprakash-dev/"><span className="icons"><FaLinkedin/></span></NavLink>
                </div>
                <div className="add-to-wishlist" onClick={() => addToWishlistHandler(currentProduct)}>
                    <IoMdHeartEmpty className="wishlist-icon"/>
                    <p>Add to wishlist</p>
                </div>
            </div>
        </div>
    ): (        <div style={{width: "100%", height: "71vh", display: "flex", alignItems: "center", justifyContent: "center"}}>
        <img style={{width: "100px", height: "full"}} src="\assets\Loading.gif" alt="" />
    </div>)
}

export default ProductDetails;