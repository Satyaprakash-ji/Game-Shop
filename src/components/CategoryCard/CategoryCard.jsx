import { useNavigate } from "react-router-dom";
import "./CategoryCard.css"
import { useContext } from "react";
import { ProductContext, ProductDispatchContext } from "../../contexts/ProductContext"

const CategoryCard = ({ category }) => {

    const {productDispatch} = useContext(ProductDispatchContext)
    const {  products } = useContext(ProductContext)
    const allProducts = products.productsData.products
    const navigate = useNavigate();
    const { categoryName, img, totalItems } = category;

    const filterData = (categoryName === "PC Games" || categoryName === "Xbox Games" || categoryName === "PS Games" || categoryName === "Gaming Components") ? allProducts?.filter((product) => product.category === categoryName) : allProducts;

    const categoryOnClickHandler = () => {
        navigate("/products", window.scrollTo(0, 0))
        productDispatch({
            type: "CATEGORY_FILTER",
            payload: categoryName
        })
        localStorage.setItem('selectedCategoryData', JSON.stringify(filterData));
    }

    return(
        <div className="category-card" >
            <div className="category-image"onClick={() => categoryOnClickHandler()} >
                <img src={img} alt="" />
                <div className="category-detail">
                    <h3>{categoryName}</h3>
                    <p>{totalItems}</p>
                </div>
            </div>
        </div>
    )
}

export default CategoryCard;