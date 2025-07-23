import { createContext, useEffect, useReducer } from "react";
import { initialState, productReducer } from "../reducers/productReducer";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

export const ProductContext = createContext(null);
export const ProductDispatchContext = createContext(null);


export const ProductProvider = ({children}) => {

    const [products, productDispatch] = useReducer(productReducer, initialState);
    const navigate = useNavigate();

    const getProductData = async() => {
        try {
            const { status, data } = await axiosInstance.get("/api/v1/product");
            if(status === 200){
                productDispatch({ type: "INITIALISED_DATA", payload: data })
            }
        } catch (error) {
            console.error(error)
        }
    }

    const getAllCategories = async() => {
        try {
            const { status, data } = await axiosInstance.get("/api/v1/category")
            if(status === 200){
                productDispatch({ type: "INITIALISED_CATEGORIES", payload: data})
            }
        } catch (error) {
            console.error(error)
        }
    }

    const getCategoriesProductData = async (categoryName) => {
        try {
            
            const { status, data } = await axiosInstance.get(`/api/v1/category/${categoryName}`);
            if( status === 200 ){
                productDispatch({ type: "SELECTED_CATEGORY_DATA", payload: data })
            }
            navigate("/products", window.scrollTo(0, 0))
            localStorage.setItem('selectedCategoryData', JSON.stringify(data));
        } catch (error) {
            console.log(error)
        }
    }

    const getCategoryCounts = (products) => {
            const counts = {};
            products.forEach((item) => {
            counts[item.category] = (counts[item.category] || 0) + 1;
        });
        return counts;
    };


    useEffect(() => {
        getProductData();
        getAllCategories();
    }, [])

    return(
        <ProductContext.Provider value={{products, getCategoriesProductData, getCategoryCounts}}>
            <ProductDispatchContext.Provider value={{productDispatch}}>
                {children}
            </ProductDispatchContext.Provider>
        </ProductContext.Provider>
    )
}