export const orderInitialValue = {
    orderAddress: {},
    orderHistory: [],
    allOrders: [],
};

export const orderReducer = (state, {type, payload}) => {
    switch (type) {

      case "SET_ORDER_ADDRESS": {
        const newAddress = payload ? payload : {};
        return { ...state, orderAddress: newAddress };
      }

      case "SET_ORDER_HISTORY":
        return { ...state, orderHistory: payload};

      case "SET_ALL_ORDERS":
        return { ...state, allOrders: payload }

      default:
        return state;
    }
}