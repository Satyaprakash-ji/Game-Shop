export const initialCart = {
    cartData: [],
    orderPlaced: [],
} 

export const CartReducer = (state, {type, payload}) => {
    switch (type) {
        case "DISPLAY_BASKET":
            return { ...state, cartData: payload }
        case "ADD_TO_BASKET":
            return { ...state, cartData: payload }
        case "DELETE_FROM_BASKET":
            return { ...state, cartData: payload }
        case "INCREASE_QUANTITY":
            return { ...state, cartData: payload }
        case "DECREASE_QUANTITY":
            return { ...state, cartData: payload }
        case "ORDER_PLACE":
            return { ...state, orderPlaced: [...state.orderPlaced, payload] }
        default:
            console.log("something is wrong in cart reducer")
            return state;
    }
}