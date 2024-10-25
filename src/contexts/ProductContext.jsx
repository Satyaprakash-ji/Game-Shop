import { createContext, useEffect, useReducer } from "react";
import axios from "axios";
import { initialState, productReducer } from "../reducers/productReducer";

export const ProductContext = createContext(null);
export const ProductDispatchContext = createContext(null);

export const ProductProvider = ({children}) => {

    const [products, productDispatch] = useReducer(productReducer, initialState)

    const getProductData = async() => {
        try {
            const { status, data } = await axios.get("/api/products");
            if(status === 200){
                productDispatch({ type: "INITIALISED_DATA", payload: data })
            }
        } catch (error) {
            console.error(error)
        }
    }

    const getCategoriesData = async() => {
        try {
            const { status, data } = await axios.get("/api/categories")
            if(status === 200){
                productDispatch({ type: "INITIALISED_CATEGORIES", payload: data})
            }
        } catch (error) {
            console.error(error)
        }
    }


    useEffect(() => {
        getProductData();
        getCategoriesData();
    }, [])

    return(
        <ProductContext.Provider value={{products}}>
            <ProductDispatchContext.Provider value={{productDispatch}}>
                {children}
            </ProductDispatchContext.Provider>
        </ProductContext.Provider>
    )
}