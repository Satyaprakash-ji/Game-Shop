import { createContext, useReducer } from "react";
import { orderInitialValue, orderReducer } from "../reducers/orderReducer";

export const OrderContext = createContext();

export const OrderProvider = ({children}) => {

    const [order, orderDispatch] = useReducer(orderReducer, orderInitialValue);

    return(
        <OrderContext.Provider value={{order, orderDispatch}}>
            {children}
        </OrderContext.Provider>
    )
}