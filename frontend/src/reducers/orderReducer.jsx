export const orderInitialValue = {
    // orderDetails: null,
    orderAddress: {},
    // priceDetails:{
    //     subtotal: 0,
    //     discount: 0,
    //     totalAmount: 0,
    //     totalQuantity: 0,
    // },
    orderHistory: [],
};

export const orderReducer = (state, {type, payload}) => {
    switch (type) {
      // case "SET_ORDER_DETAILS": {
      //   const { subtotal, discount, totalAmount, totalQuantity } = payload;
      //   return {
      //     ...state,
      //     priceDetails: { subtotal, discount, totalAmount, totalQuantity },
      //   };
      // }

      case "SET_ORDER_ADDRESS": {
        const newAddress = payload ? payload : {};
        return { ...state, orderAddress: newAddress };
      }

      // case "PLACE_ORDER_SUCCESS":
      // return {...state, orderDetails: payload, orderHistory: [...state.orderHistory, payload] };

      case "SET_ORDER_HISTORY":
        return { ...state, orderHistory: payload};

      default:
        return state;
    }
}