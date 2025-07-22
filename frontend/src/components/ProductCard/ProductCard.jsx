import { useContext } from "react";
import StarRating from "../StarRating/StarRating";
import "./ProductCard.css";
import { IoCartOutline, IoCart } from "react-icons/io5";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../contexts/CartContext";
import { WishlistContext } from "../../contexts/WishlistContext";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { _id, img, title, price, originalPrice, rating } = product;
  const {
    addToWishlistHandler,
    deleteFromWishlist,
    isItemInWishlist,
  } = useContext(WishlistContext);
  const { addToBasketHandler, isItemInBasket } = useContext(CartContext);

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={img} alt="" onClick={() => navigate(`/products/${_id}`)} />
        <div className="wishlist-and-cart-box">
          {isItemInBasket(_id) ? (
            <IoCart className="cart-icon-fill" onClick={() => addToBasketHandler(product)} />
          ) : (
            <IoCartOutline
              title="Cart"
              className="cart-icon"
              onClick={() => addToBasketHandler(product)}
            />
          )}
          <IoIosSearch className="quick-view" />
          {isItemInWishlist(_id) ? (
            <IoMdHeart
              className="wishlist-fill"
              onClick={() => deleteFromWishlist(product._id)}
            />
          ) : (
            <IoMdHeartEmpty
              className="wishlist"
              onClick={() => addToWishlistHandler(product)}
            />
          )}
        </div>
      </div>
      <h3 onClick={() => navigate(`/products/${_id}`)}>{title}</h3>
      <StarRating rating={rating} />
      <p>
        <span>₹{originalPrice?.toLocaleString()}.00</span> ₹
        {price?.toLocaleString()}.00
      </p>
    </div>
  );
};

export default ProductCard;
