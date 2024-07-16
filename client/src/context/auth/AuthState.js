import React, {useReducer} from "react";
import axios from "axios";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import setAuthToken from "../../utils/setAuthToken";

import {
  GET_EMAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  ADD_ITEM,
  DELETE_SELECTED,
  DELETE_ALL,
  DELETE_BASKET_ITEM,
  DELETE_BASKET_ITEM_ERROR,
  DELETE_ERROR,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  UPDATE_USER,
  DELETE_USER,
  CHECK_EMAIL,
  BUY_PRODUCTS_ERROR,
  ADD_TO_BASKET,
  CHANGE_SIZE,
  ADD_TO_BASKET_ERROR,
  CHANGE_SIZE_ERROR,
} from "../types";

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    emailUnique: null,
    loading: true,
    user: null,
    customer: {
      title: "",
      firstName: "",
      lastName: "",
      email: "",
      email2: "",
      password: "",
      password2: "",
      day: "",
      month: "",
      year: "",
    },
    favItems: null,
    basketItems: null,
    error: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Get email
  const getEmail = email => dispatch({type: GET_EMAIL, payload: email});

  // Check email
  const checkEmail = async email => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res =
        process.env.REACT_APP_ENV !== "production"
          ? await axios.post(`/api/email`, email, config)
          : await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/email`, email, config);

      dispatch({
        type: CHECK_EMAIL,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  // Add item to wishlist
  const addItem = async (item, id) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res =
        process.env.REACT_APP_ENV !== "production"
          ? await axios.put(`/api/wishlist/${id}`, item, config)
          : await axios.put(
              `${process.env.REACT_APP_BACKEND_URL}/api/wishlist/${id}`,
              item,
              config
            );

      dispatch({type: ADD_ITEM, payload: res.data.updatedUser.itemsLiked});
    } catch (err) {
      dispatch({type: BUY_PRODUCTS_ERROR});
    }
  };

  // Add item to basket
  const addToBasket = async (item, id) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res =
        process.env.REACT_APP_ENV !== "production"
          ? await axios.put(`/api/basket/${id}`, item, config)
          : await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/basket/${id}`, item, config);

      dispatch({type: ADD_TO_BASKET, payload: res.data.updatedUser.basket});
    } catch (err) {
      dispatch({type: ADD_TO_BASKET_ERROR});
    }
  };

  // Change size of item
  const changeSize = async (item, size, id) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res =
        process.env.REACT_APP_ENV !== "production"
          ? await axios.put(`/api/size/${id}`, {item, size})
          : await axios.put(
              `${process.env.REACT_APP_BACKEND_URL}/api/size/${id}`,
              {item, size},
              config
            );

      dispatch({type: CHANGE_SIZE, payload: res.data.updatedUser.basket});
    } catch (err) {
      dispatch({type: CHANGE_SIZE_ERROR});
    }
  };

  // Delete selected
  const deleteSelected = async (item, id) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res =
        process.env.REACT_APP_ENV !== "production"
          ? await axios.post(`/api/wishlist/${id}`, {item}, config)
          : await axios.post(
              `${process.env.REACT_APP_BACKEND_URL}/api/wishlist/${id}`,
              {item},
              config
            );

      dispatch({type: DELETE_SELECTED, payload: res.data.updatedUser.itemsLiked});
    } catch (err) {
      dispatch({type: DELETE_ERROR});
    }
  };

  // Delete all items
  const deleteAll = async id => {
    try {
      const res =
        process.env.REACT_APP_ENV !== "production"
          ? await axios.patch(`/api/wishlist/${id}`)
          : await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/api/wishlist/${id}`);

      dispatch({type: DELETE_ALL, payload: res.data.updatedUser.itemsLiked});
    } catch (err) {
      dispatch({type: AUTH_ERROR});
    }
  };

  // Delete basket item
  const deleteBasketItem = async (item, id) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res =
        process.env.REACT_APP_ENV !== "production"
          ? await axios.post(`/api/basket/${id}`, {item}, config)
          : await axios.post(
              `${process.env.REACT_APP_BACKEND_URL}/api/basket/${id}`,
              {item},
              config
            );

      dispatch({type: DELETE_BASKET_ITEM, payload: res.data.updatedUser.basket});
    } catch (err) {
      dispatch({type: DELETE_BASKET_ITEM_ERROR});
    }
  };

  // Load user
  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);

      try {
        const res =
          process.env.REACT_APP_ENV === "development"
            ? await axios.get(`/api/auth`)
            : await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/auth`);

        dispatch({
          type: USER_LOADED,
          payload: res.data,
        });
      } catch (err) {
        dispatch({type: AUTH_ERROR});
      }
    }
  };

  // Register user
  const register = async formData => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res =
        process.env.REACT_APP_ENV !== "production"
          ? await axios.post(`/api/users`, formData, config)
          : await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/users`, formData, config);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });

      loadUser();
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg,
      });
    }
  };
  // Login user
  const login = async formData => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res =
        process.env.REACT_APP_ENV === "development"
          ? await axios.post(`/api/auth`, formData, config)
          : await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth`, formData, config);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      loadUser();
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  // Update user
  const updateUser = async user => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res =
        process.env.REACT_APP_ENV !== "production"
          ? await axios.put(`/api/users`, user, config)
          : await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/users`, user, config);
      dispatch({type: UPDATE_USER, payload: res.data});
    } catch (err) {
      dispatch({type: AUTH_ERROR});
    }
  };

  // Delete user
  const deleteUser = async email => {
    try {
      const res =
        process.env.REACT_APP_ENV !== "production"
          ? await axios.delete(`/api/users`, {
              data: {email},
            })
          : await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/users`, {
              data: {email},
            });
      dispatch({type: DELETE_USER});
      res.status(204);
    } catch (err) {
      dispatch({type: AUTH_ERROR});
    }
  };

  // Logout
  const logout = () => dispatch({type: LOGOUT});

  // Clear Errors
  const clearErrors = () => dispatch({type: CLEAR_ERRORS});

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        emailUnique: state.emailUnique,
        loading: state.loading,
        user: state.user,
        customer: state.customer,
        favItems: state.favItems,
        basketItems: state.basketItems,
        error: state.error,
        getEmail,
        checkEmail,
        register,
        login,
        updateUser,
        deleteUser,
        logout,
        loadUser,
        addItem,
        addToBasket,
        changeSize,
        deleteSelected,
        deleteAll,
        deleteBasketItem,
        clearErrors,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
