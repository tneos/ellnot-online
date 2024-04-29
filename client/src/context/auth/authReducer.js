import {
  USER_LOADED,
  ADD_ITEM,
  ADD_TO_BASKET,
  CHANGE_SIZE,
  ADD_TO_BASKET_ERROR,
  DELETE_SELECTED,
  DELETE_ALL,
  DELETE_BASKET_ITEM,
  DELETE_BASKET_ITEM_ERROR,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  GET_EMAIL,
  CHECK_EMAIL,
  CLEAR_ERRORS,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  UPDATE_USER,
  DELETE_USER,
} from "../types";

const authReducer = (state, action) => {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        favItems: action.payload && action.payload.itemsLiked,
        basketItems: action.payload && action.payload.basket,
        loading: false,
        user: action.payload,
      };
    case ADD_ITEM:
      return {
        ...state,
        favItems: action.payload,
      };
    case ADD_TO_BASKET:
      return {
        ...state,
        basketItems: action.payload,
      };
    case CHANGE_SIZE:
      return {
        ...state,
        basketItems: action.payload,
      };
    case DELETE_SELECTED:
      localStorage.setItem("wishlist", action.payload);
      return {
        ...state,
        favItems: action.payload,
      };
    case DELETE_ALL:
      return {
        ...state,
        favItems: action.payload,
      };
    case DELETE_BASKET_ITEM:
      localStorage.setItem("basket", action.payload);
      return {
        ...state,
        basketItems: action.payload,
      };

    case GET_EMAIL:
      return {
        ...state,
        customer: {
          ...state.customer,
          customerEmail: action.payload,
        },
      };

    case CHECK_EMAIL:
      return {
        ...state,
        ...action.payload,
        emailUnique: true,
      };

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case UPDATE_USER:
      return {
        ...state,
        user: action.payload,
        token: null,
        isAuthenticated: false,
      };

    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case DELETE_USER:
    case LOGOUT:
    case ADD_TO_BASKET_ERROR:
    case DELETE_BASKET_ITEM_ERROR:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        favItems: null,
        user: null,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
        emailUnique: null,
      };
    default:
      return state;
  }
};

export default authReducer;
