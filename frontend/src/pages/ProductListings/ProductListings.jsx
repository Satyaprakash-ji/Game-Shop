import { useContext, useState } from "react";
import "./ProductListings.css";
import ProductCard from "../../components/ProductCard/ProductCard";
import FilterBox from "./FilterBox";
import { FilterContext } from "../../contexts/FilterContext";
import { FaFilter } from "react-icons/fa";
import Pagination from "../../components/Pagination/Pagination";
import { ProductContext, ProductDispatchContext } from "../../contexts/ProductContext";

const ProductListings = () => {

    const { sortByPriceFilteredProduct, savedCategoryData } = useContext(FilterContext);
    const [filterButton, setFilterButton] = useState(false);
    const { products } = useContext(ProductContext)
    const { productDispatch } = useContext(ProductDispatchContext);
    
    const CategoryName = localStorage.getItem("selectedCategoryName");
    const selectedCategoriesCount = savedCategoryData?.products.length

    const currentPage = products.paginationPage;
    const booksPerPage = 12;
    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = sortByPriceFilteredProduct?.slice(indexOfFirstBook, indexOfLastBook);

    const paginate = (pageNumber) => {
      productDispatch({
        type: "SET_PRODUCT_PAGE_NUMBER",
        payload: pageNumber,
      });
    }

    const handleFilterButton = () => {
        setFilterButton(!filterButton);
    }

    return(
        <div>
            <h1 className="listings-title">Showing all {CategoryName} <span style={{fontSize: "16px"}}>({selectedCategoriesCount} Games)</span></h1> 
            <button className="filter-button" onClick={() => handleFilterButton()}><FaFilter/> {filterButton ? "Hide Filters" : "Show Filters"}</button>
            <div className="products-listings-container">
                <div className="filter-container">
                    <span className={filterButton ? "display-filters" : "hide-filters"}><FilterBox /></span>
                </div>
                <div className="products-container">
                    {currentBooks?.map((game) => (
                        <span key={game._id} className="internal-product-card"><ProductCard key={game._id} product={game} /></span>
                        
                    ))}
                </div>
            </div>

            <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                <Pagination booksPerPage={booksPerPage} totalBooks={sortByPriceFilteredProduct.length} paginate={paginate} currentPage={currentPage}/>
            </div>

        </div>
    )
}

export default ProductListings;