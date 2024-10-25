import { useContext } from "react";
import { ProductContext } from "../../index";
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import "./Category.css";

const Category = () => {

    const { products } = useContext(ProductContext)

    const categoriesDisplay = products?.categoriesData?.categories?.map((category) => <CategoryCard key={category.id} category={category} />)

    return(
        <div className="ctegory-container">
            <p>Home / Category</p>
            <div className="categories">
                {categoriesDisplay}
            </div>
        </div>
    )
}

export default Category;