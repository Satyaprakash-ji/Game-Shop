import "./Wishlist.css"
import { useContext } from "react"
import ProductCard from "../../components/ProductCard/ProductCard"
import { RxCross2 } from "react-icons/rx";
import { WishlistContext } from "../../contexts/WishlistContext";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";

const Wishlist = () => {

    const { wishlist, deleteFromWishlist, isLoading } = useContext(WishlistContext)
    const { wishlistData } = wishlist
    const navigate = useNavigate();

    if (isLoading) {
      return <Loader />
    }

    return (
      <div className="wishlist-container">
        <h1 className="wishlist-title">YOUR WISHLIST</h1>
        <div className="wishlist-product-container">
          {wishlistData.length >= 1 ? (
            wishlistData?.map((product) => (
              <div className="single-product-container">
                <RxCross2 className="cross-icon" onClick={() => deleteFromWishlist(product._id)} />
                <ProductCard product={product} />
              </div>
            ))
          ) : (
            <div className="empty-cart">
              <img src="\assets\wishlist.png" alt="" />
              <h1>Your Wishlist Is Empty.</h1>
              <p>
                You don't have any products in the wishlist yet. <br /> You will find a lot of interesting
                products on our "Shop" page.
              </p>
              <button className="return-to-shop-btn" onClick={() => navigate("/category")}>
                RETURN TO SHOP
              </button>
            </div>
          )}
        </div>
      </div>
    );
}

export default Wishlist