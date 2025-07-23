import { createContext, useContext, useEffect, useReducer } from "react";
import { CartReducer, initialCart } from "../reducers/cartReducer";
import { useNavigate, useLocation } from 'react-router-dom'
import { toast } from "react-toastify";
import { AuthContext } from "./AuthContext";
import axiosInstance from "../utils/axiosInstance";

export const CartContext = createContext();
export const CartDispatchContext = createContext(null);

export const CartProvider = ({children}) => {

  const [cart, cartDispatch] = useReducer(CartReducer, initialCart);
  const { loginData } = useContext(AuthContext)
  const navigate = useNavigate()
  const location = useLocation()

  const getAllCartItems = async () => {
      try {
        const response = await axiosInstance.get("/api/v1/cart", {
          withCredentials: true,
        });
        const {status, data: { cart }} = response;
        if (status === 200) {
          cartDispatch({ type: "DISPLAY_BASKET", payload: cart });
        }
      } catch (error) {
        console.error("Failed to fetch cart:", error);
      }
  };

  useEffect(() => {
    if (loginData?.isLoggedIn) {
      getAllCartItems();
    } else {
      cartDispatch({ type: "DISPLAY_BASKET", payload: [] }); // Clear cart on logout
    }
  }, [loginData?.isLoggedIn]);

  const addToBasketHandler = async (product) => {
      try {
        const response = await axiosInstance.post(
          "/api/v1/cart/add",
          { productId: product._id },
          { withCredentials: true },
        );
        const {status, data: { cart, message }} = response;
        
        if (status === 200) {
          cartDispatch({ type: "ADD_TO_BASKET", payload: cart });
          if(message === "Product already in cart"){
            toast.info(`"${product.title}" already in Basket`);
          }else{
            toast.success(`"${product.title}" successfully added to Basket`);
          }
        }
      } catch (error) {
        navigate('/login', {state:{from :location}})
        toast.error(`Failed to Add "${product.title}" to Basket`,error);
      }
  };

  const updateQuantity = async (productId, type) => {
    try {
      const response = await axiosInstance.post(
        "/api/v1/cart/update-qty",
        { productId, type },
        { withCredentials: true }
      );

      const { status, data: { cart } } = response;

      if (status === 200) {
        cartDispatch({ type: "UPDATE_BASKET", payload: cart });
        toast.success(`Quantity ${type}ed successfully.`);
      }
    } catch (error) {
      toast.error("Failed to update quantity.", error);
    }
  };

  const deleteFromBasket = async (productId) => {
    try {
      const response = await axiosInstance.delete(`/api/v1/cart/${productId}`, {
        data: { productId },
        withCredentials: true,
      });
      const {status, data: { cart }} = response;
  
      if (status === 200) {
        cartDispatch({ type: "DELETE_FROM_BASKET", payload: cart });
        toast.success(`Successfully removed an item from the Basket`);
      }
    } catch (error) {
    console.error(error)
    toast.error(`Failed to remove an item from the Basket`);
    }
  };

  const isItemInBasket = (productId) => Array.isArray(cart?.cartData) && cart.cartData.some((item) => item.product?._id === productId);

  return(
      <CartContext.Provider value={{cart, getAllCartItems, addToBasketHandler, deleteFromBasket, updateQuantity, isItemInBasket }}>
        <CartDispatchContext.Provider value={{cartDispatch}}>
          {children}
        </CartDispatchContext.Provider>
      </CartContext.Provider>
  )
}