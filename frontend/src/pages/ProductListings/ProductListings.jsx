import { useContext } from "react";
import "./ProductListings.css";
import ProductCard from "../../components/ProductCard/ProductCard";
import FilterBox from "./FilterBox";
import { FilterContext } from "../../contexts/FilterContext";
import { ProductContext } from "../../contexts/ProductContext";

const ProductListings = () => {

    const { sortByPriceFilteredProduct } = useContext(FilterContext);

    const displayProductCard = sortByPriceFilteredProduct?.map((product) => <ProductCard key={product._id} product={product} />)

    return(
        <div className="products-listings-container">
            <div className="filter-container">
                <FilterBox />
            </div>
            <div className="products-container">
                {displayProductCard}
            </div>
        </div>
    )
}

export default ProductListings;