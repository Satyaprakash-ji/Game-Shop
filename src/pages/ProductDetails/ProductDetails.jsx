import { NavLink, useParams } from "react-router-dom";
import { FaFacebook, FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";
import { IoMdHeartEmpty } from "react-icons/io";
import "./ProductDetails.css"
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import StarRating from "../../components/StarRating/StarRating";
import { CartContext } from "../../contexts/CartContext";
import { AuthContext } from "../../contexts/AuthContext";
import { WishlistContext } from "../../contexts/WishlistContext";


const ProductDetails = () => {

    const { loginData } = useContext(AuthContext)
    const { addToBasketHandler } = useContext(CartContext)  
    const { addToWishlistHandler } = useContext(WishlistContext)
    const { productId } = useParams();
    const [currentProduct, setCurrentProduct] = useState(null);

    const getProductDetails = async () => {
        if (!productId) return;
        try {
            const { data } = await axios.get(`/api/products/${productId}`);
            setCurrentProduct(data.product)
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getProductDetails();
    }, []);

    return(
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
                    <div className="quantity">
                        <div className="minus">-</div>
                        <div className="number">{currentProduct?.qty ? currentProduct?.qty : "1"}</div>
                        <div className="plus">+</div>
                    </div>
                    <button className="add-button" onClick={() => addToBasketHandler( currentProduct, loginData.token)}>Add to Basket</button>
                </div>
                <div className="social-media-icons">
                    <NavLink to="https://www.facebook.com/Tanishq/"><span className="icons"><FaFacebook/></span></NavLink>
                    <NavLink to="https://twitter.com/TheIndianGirl56"><span className="icons"><FaTwitter/></span></NavLink>
                    <NavLink to="https://github.com/Satyaprakash-ji"><span className="icons"><FaGithub/></span></NavLink>
                    <NavLink to="https://www.linkedin.com/in/satyaprakash-dev/"><span className="icons"><FaLinkedin/></span></NavLink>
                </div>
                <div className="add-to-wishlist" onClick={() => addToWishlistHandler(currentProduct)}>
                    <IoMdHeartEmpty className="wishlist-icon"/>
                    <p>Add to wishlist</p>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails;