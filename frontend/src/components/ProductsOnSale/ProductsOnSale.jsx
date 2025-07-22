import ProductCard from "../ProductCard/ProductCard";
import "./ProductsOnSale.css"

const ProductsOnSale = () => {
    return(
        <div className="product-container">
            <div className="text">
                <div className="horizontal-line"></div>
                <h2>Product On Sale</h2>
                <div className="horizontal-line"></div>
            </div>
            <div className="products-cards">
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
            </div>
        </div>
    )
}

export default ProductsOnSale;