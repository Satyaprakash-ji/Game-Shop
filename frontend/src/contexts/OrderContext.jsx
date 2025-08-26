import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { orderInitialValue, orderReducer } from "../reducers/orderReducer";
import { AuthContext } from "./AuthContext";
import { CartContext } from "./CartContext";
import axiosInstance from "../utils/axiosInstance";

export const OrderContext = createContext();
export const OrderDispatchContext = createContext();

export const OrderProvider = ({ children }) => {
    const [order, orderDispatch] = useReducer(orderReducer, orderInitialValue);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const { loginData } = useContext(AuthContext);
    const { getAllCartItems } = useContext(CartContext);

  const getAllPlacedOrderItem = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get("/api/v1/user/orders", {} );
      const { status, data: { orders } } = response;
      if (status === 200) {
        orderDispatch({ type: "SET_ORDER_HISTORY", payload: [...orders] });
      }
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const placeOrder = async (orderData) => {
    setIsLoading(true);
    try {
        const response = await axiosInstance.post("/api/v1/user/orders/place", orderData, {} );
    const { status } = response;
    if(status === 201){
        getAllPlacedOrderItem();
        toast.success("Order placed successfully!");
        getAllCartItems();
    }
    navigate("/profile/orderHistory");
    setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const getAllOrders = async () => {
    setIsLoading(true);
    try {
      const { data } = await axiosInstance.get("/api/v1/user/all-orders");
      orderDispatch({ type: "SET_ALL_ORDERS", payload: data.orders });
      setIsLoading(false);
    } catch (error) {
      toast.error("Failed to fetch all orders.");
      console.error(error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (loginData?.isLoggedIn) {
      getAllPlacedOrderItem();
    }
  }, [loginData?.isLoggedIn]);

  return (
    <OrderContext.Provider value={{ order, orderDispatch, placeOrder, getAllPlacedOrderItem, getAllOrders ,isLoading }}>
      <OrderDispatchContext.Provider value={orderDispatch}>
        {children}
      </OrderDispatchContext.Provider>
    </OrderContext.Provider>
  );
};
