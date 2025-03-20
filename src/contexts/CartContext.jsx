import { createContext, useContext, useReducer } from "react";
import { AuthContext } from "./AuthContext";
import { CartReducer, initialCart } from "../reducers/cartReducer";
import { useNavigate, useLocation } from 'react-router-dom'
import { toast } from "react-toastify";
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
            toast.success(`"${product.title}" successfully added to Basket`);
          }
        } catch (error) {
          navigate('/login', {state:{from :location}})
          toast.error(`Failed to Add "${product.title}" to Basket`);
        }
    };

    const deleteFromBasket = async (productId, encodedToken) => {
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
          toast.success(`Successfully removed an item from the Basket`);
        }
      } catch (error) {
      console.error(error)
      toast.error(`Failed to remove an item from the Basket`);
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
        );
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
        toast.error(`Failed to update quantity of an item in the Basket`);
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