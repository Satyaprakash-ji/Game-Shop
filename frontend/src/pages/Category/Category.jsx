import { useContext } from "react";
import { ProductContext } from "../../main";
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import "./Category.css";

const Category = () => {

    const { products, getCategoryCounts } = useContext(ProductContext);
    
    const categoryCounts = getCategoryCounts(products?.productsData?.products || []);
    
    const categoriesDisplay = products?.categories?.categoriesData?.categories?.map((category) => <CategoryCard key={category._id} category={category} count={categoryCounts[category.name] || 0} />)

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