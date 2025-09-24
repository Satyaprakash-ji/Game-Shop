import "./CategoryCard.css"
import { useContext } from "react";
import { ProductContext } from "../../contexts/ProductContext"

const CategoryCard = ({ category }) => {

    const { categoryName, img, totalItem } = category;
    const { getCategoriesProductData } = useContext(ProductContext)

    return(
        <div className="category-card" >
            <div className="category-image"onClick={() => getCategoriesProductData(categoryName)} >
                <img src={img} alt="" />
                <div className="category-detail">
                    <h3>{categoryName}</h3>
                    <p>{totalItem}</p>
                </div>
            </div>
        </div>
    )
}

export default CategoryCard;