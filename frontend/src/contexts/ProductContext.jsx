import { createContext, useEffect, useReducer, useState } from "react";
import { initialState, productReducer } from "../reducers/productReducer";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

export const ProductContext = createContext(null);
export const ProductDispatchContext = createContext(null);


export const ProductProvider = ({children}) => {

    const [products, productDispatch] = useReducer(productReducer, initialState);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const getProductData = async() => {
        setIsLoading(true);
        try {
            const { status, data } = await axiosInstance.get("/api/v1/product");
            if(status === 200){
                productDispatch({ type: "INITIALISED_DATA", payload: data })
            }
            setIsLoading(false);
        } catch (error) {
            console.error(error)
            setIsLoading(false);
        }
    }

  const createProduct = async (formData) => {
    setIsLoading(true);
    try {
        const { data, status } = await axiosInstance.post(`/api/v1/product`, formData);
        if (status === 200) {
            productDispatch({ type: "ADD_PRODUCT", payload: data.createdProduct });
            return data.createdProduct;
        }
        setIsLoading(false);
    } catch (error) {
        console.error(error);
        setIsLoading(false);
        throw error;
    }
};


const updateProduct = async (id, updatedData) => {
  setIsLoading(true);
  try {
    let payload = updatedData instanceof FormData ? updatedData : new FormData();

    const { data, status } = await axiosInstance.put(`/api/v1/product/${id}`, payload);
    if (status === 200) {
      productDispatch({ type: "UPDATE_PRODUCT", payload: data.updatedProduct });
      return data.updatedProduct;
    }
    setIsLoading(false);
  } catch (error) {
    console.error(error);
    setIsLoading(false);
    throw error;
  }
};

    const deleteProduct = async (id) => {
        setIsLoading(true);
        try{
            const { data, status } = await axiosInstance.delete(`/api/v1/product/${id}`)
            if(status === 200){
                return data;
            }
            
            setIsLoading(false);
        } catch (error){
            console.error(error);
            setIsLoading(false);
            throw error;
        }
    }


    const getAllCategories = async() => {
        setIsLoading(true);
        try {
            const { status, data } = await axiosInstance.get("/api/v1/category")
            if(status === 200){
                productDispatch({ type: "INITIALISED_CATEGORIES", payload: data})
            }
            setIsLoading(false);
        } catch (error) {
            console.error(error)
            setIsLoading(false);
        }
    }

    const getCategoriesProductData = async (categoryName) => {
        setIsLoading(true);
        try {
            
            const { status, data } = await axiosInstance.get(`/api/v1/category/${categoryName}`);
            if( status === 200 ){
                productDispatch({ type: "SELECTED_CATEGORY_DATA", payload: data })
            }
            navigate("/products", window.scrollTo(0, 0))
            localStorage.setItem('selectedCategoryData', JSON.stringify(data));
            setIsLoading(false);
        } catch (error) {
            console.log(error)
            setIsLoading(false);
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
        <ProductContext.Provider value={{products, getProductData, getCategoriesProductData, getCategoryCounts, updateProduct, createProduct, deleteProduct, isLoading}}>
            <ProductDispatchContext.Provider value={{productDispatch}}>
                {children}
            </ProductDispatchContext.Provider>
        </ProductContext.Provider>
    )
}