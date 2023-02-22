import {BUY_PRODUCTS, BUY_PRODUCTS_ERROR, PAYMENT, PAYMENT_ERROR, EMPTY_BASKET} from "../types";

const checkoutReducer = (state, action) => {
  switch (action.type) {
    case BUY_PRODUCTS:
      return {
        ...state,
        clientDetails: action.payload,
      };
    case PAYMENT:
      return {
        ...state,
        itemsBought: {...action.payload},
      };
    case EMPTY_BASKET:
      localStorage.removeItem("basket");
      return {
        ...state,
        basketItems: action.payload,
      };
    case BUY_PRODUCTS_ERROR:
    case PAYMENT_ERROR:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default checkoutReducer;
