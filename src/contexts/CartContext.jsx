import { createContext, useContext, useReducer } from "react";
import { AuthContext } from "./AuthContext";
import { CartReducer, initialCart } from "../reducers/cartReducer";
import {useNavigate, useLocation} from 'react-router-dom'
import axios from "axios";

export const CartContext = createContext();
export const CartDispatchContext = createContext(null);

export const CartProvider = ({children}) => {

    const { loginData } = useContext(AuthContext);
    const [cart, cartDispatch] = useReducer(CartReducer, initialCart);
    const navigate = useNavigate()
    const location = useLocation()

    const getAllCartItems = async (encodedToken) => {
        try {
          const response = await axios.get("/api/user/cart", {
            headers: {
              authorization: encodedToken,
            },
          });;
          const {
            status,
            data: { cart },
          } = response;
          if (status === 200) {
            cartDispatch({ type: "DISPLAY_BASKET", payload: [...cart] });
          }
        } catch (error) {
          if (loginData.token)
          console.error(error);
        }
    };

    const addToBasketHandler = async (product, encodedToken) => {
        try {
          const response = await axios.post(
            "/api/user/cart",
            { product },
            {
              headers: {
                authorization: encodedToken,
              },
            }
          );
          const {
            status,
            data: { cart },
          } = response;
          if (status === 201) {
            cartDispatch({ type: "ADD_TO_BASKET", payload: cart });
            console.log("Item Added to Cart!!");
          }
        } catch (error) {
          navigate('/login', {state:{from :location}})
        }
    };

    const deleteFromBasket = async (productId, encodedToken, title,showNotification) => {
        try {
          const response = await axios.delete(`/api/user/cart/${productId}`, {
            headers: {
              authorization: encodedToken,
            },
          });;
          const {
            status,
            data: { cart },
          } = response;
    
          if (status === 200) {
            cartDispatch({ type: "DELETE_FROM_BASKET", payload: cart });
          }
        } catch (error) {
        console.error(error)
        }
    };

    const changeQuantity = async (productId, encodedToken, type) => {
      try {
        const response = await axios.post(
          `/api/user/cart/${productId}`,
          {
            action: { type },
          },
          {
            headers: {
              authorization: encodedToken,
            },
          }
        );;
        const {
          status,
          data: { cart },
        } = response;
        if (status === 200) {
          if (type === "increment")
            cartDispatch({ type: "INCREASE_QUANTITY", payload: cart });
          else cartDispatch({ type: "DECREASE_QUANTITY", payload: cart });
        }
      } catch (error) {
        console.log(error);
      }
    };

    const isItemInBasket = (prodId)=>{
        return cart?.cartData.find(item=> item._id === prodId)?true:false
    }

    return(
        <CartContext.Provider value={{cart, getAllCartItems, addToBasketHandler, deleteFromBasket, changeQuantity, isItemInBasket }}>
          <CartDispatchContext.Provider value={{cartDispatch}}>
            {children}
          </CartDispatchContext.Provider>
        </CartContext.Provider>
    )
}