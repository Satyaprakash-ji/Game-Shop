import { useContext } from "react";
import "./Home.css"
import { ProductContext } from "../../contexts/ProductContext";
import ProductCard from "../../components/ProductCard/ProductCard";
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import { useNavigate } from "react-router-dom";

const Home = () => {

    const { products } = useContext(ProductContext);
    const navigate = useNavigate();

    const saleProduct = products?.productsData?.products?.sort((a,b) => b.rating - a.rating).slice(0,4)
    const featuredProduct = products?.productsData?.products?.sort((a,b) => new Date(b.releaseDate)- new Date(a.releaseDate)).slice(0,8)
    const categoriesData = products?.categories?.categoriesData?.categories

    return(
        <div className="home-page">
            <div className="hero-section">
                <img src="/assets/dark-night.jpg" alt="Hero" />
                <div className="hero-content">
                    <h1>Games</h1>
                    <h3>Starting from just ₹499</h3>
                    <p>We at Game Shop offer games for PC, PS4, PS5, and Xbox at <br /> the most affordable price. Get your favourite game now!</p>
                    <button className="go-to-shop-btn" onClick={() => navigate("/category")}>GO TO SHOP</button>
                </div>
            </div>
            <div className="product-container">
                <div className="product-on-sale-section">
                    <div className="heading-container">
                        <span className="horizontal-line"></span>
                        <h2 className="heading-title">Product On Sale</h2>
                        <span className="horizontal-line"></span>
                    </div>
                    <div className="products-cards">
                        {saleProduct?.map((game) => (
                            <span key={game._id} className="internal-product-card"><ProductCard key={game._id} product={game} /></span>
                            
                        ))}
                    </div>
                </div>
                <div className="featured-product-section">
                    <div className="heading-container">
                        <span className="horizontal-line"></span>
                        <h2 className="heading-title">Featured Products</h2>
                        <span className="horizontal-line"></span>
                    </div>
                    <div className="products-cards">
                        {featuredProduct?.map((game) => (
                            <span key={game._id} className="internal-product-card"><ProductCard key={game._id} product={game} /></span>
                            
                        ))}
                    </div>
                </div>
                <div className="category-section">
                    <div className="heading-container">
                        <span className="horizontal-line"></span>
                        <h2 className="heading-title">Shop by Category</h2>
                        <span className="horizontal-line"></span>
                    </div>
                    <div className="products-cards">
                        {categoriesData?.map((category) => (
                            <CategoryCard key={category._id} category={category} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;