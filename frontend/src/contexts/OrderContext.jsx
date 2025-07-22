import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { orderInitialValue, orderReducer } from "../reducers/orderReducer";
import { AuthContext } from "./AuthContext";
import { CartContext } from "./CartContext";

export const OrderContext = createContext();
export const OrderDispatchContext = createContext();

export const OrderProvider = ({ children }) => {
    const [order, orderDispatch] = useReducer(orderReducer, orderInitialValue);
    const navigate = useNavigate();
    const { loginData } = useContext(AuthContext);
    const { getAllCartItems } = useContext(CartContext);

  const getAllPlacedOrderItem = async () => {
    try {
      const response = await axios.get("/api/v1/user/orders", {
        withCredentials: true,
      });
      const { status, data: { orders } } = response;
      if (status === 200) {
        orderDispatch({ type: "SET_ORDER_HISTORY", payload: [...orders] });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const placeOrder = async (orderData) => {
    try {
        const response = await axios.post("/api/v1/user/orders/place", orderData, {
        withCredentials: true,
    });
    const { status } = response;
    if(status === 201){
        getAllPlacedOrderItem();
        toast.success("Order placed successfully!");
        getAllCartItems();
    }
    navigate("/profile/orderHistory");
    } catch (error) {
        console.error(error);
    }
  };

  useEffect(() => {
    if (loginData?.isLoggedIn) {
      getAllPlacedOrderItem();
    }
  }, [loginData?.isLoggedIn]);

  return (
    <OrderContext.Provider value={{ order, orderDispatch, placeOrder, getAllPlacedOrderItem }}>
      <OrderDispatchContext.Provider value={orderDispatch}>
        {children}
      </OrderDispatchContext.Provider>
    </OrderContext.Provider>
  );
};
