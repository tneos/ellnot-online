import React, {useContext, useReducer} from "react";
import {useStripe} from "@stripe/react-stripe-js";
import {BUY_PRODUCTS, BUY_PRODUCTS_ERROR, AUTH_ERROR, USER_LOADED, EMPTY_BASKET} from "../types";

import axios from "axios";
import CheckoutContext from "./checkoutContext";
import AuthContext from "../auth/authContext";
import checkoutReducer from "./checkoutReducer";

const CheckoutState = props => {
  const stripe = useStripe();
  const authContext = useContext(AuthContext);

  const {loadUser} = authContext;

  const initialState = {
    clientDetails: {
      id: "",
      title: "",
      fullName: " ",
      phone: "",
      fullAddress: " ",
      postCode: "",
      deliveryOptions: "",
    },
    cardDetails: {
      cardName: "",
      cardNumber: "",
      dob: "",
      cvc: "",
    },
    session: null,
    basketItems: localStorage.getItem("basket"),
  };

  const [state, dispatch] = useReducer(checkoutReducer, initialState);

  // Save client's details
  const buyProducts = async (form, items, id, total) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res =
        process.env.REACT_APP_ENV !== "production"
          ? await axios.put(`/api/checkout/${id}`, {form, items, total})
          : await axios.put(
              `${process.env.REACT_APP_BACKEND_URL}/api/checkout/${id}`,
              {form, items, total},
              config
            );
      loadUser();
      console.log(res.data);
      // Create checkout form and charge credit card
      await stripe.redirectToCheckout({
        sessionId: res.data.session.id,
      });

      dispatch({type: BUY_PRODUCTS, payload: res.data.updatedUser});
    } catch (err) {
      dispatch({type: BUY_PRODUCTS_ERROR});
    }
  };

  // Get transaction details
  const getTransactionDetails = async path => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res =
      process.env.REACT_APP_ENV !== "production"
        ? await axios.get(`/api/payment_confirmation/${path}`, config)
        : await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/api/payment_confirmation/${path}`,
            config
          );

    dispatch({type: USER_LOADED});

    return res.data;
  };

  // Empty basket when payment confirmed
  const emptyBasket = async id => {
    try {
      const res =
        process.env.REACT_APP_ENV !== "production"
          ? await axios.patch(`/api/basket/${id}`)
          : await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/api/basket/${id}`);
      console.log(res.data.updatedUser.basket);
      dispatch({type: EMPTY_BASKET, payload: res.data.updatedUser.basket});
    } catch (err) {
      dispatch({type: AUTH_ERROR});
    }
  };

  return (
    <CheckoutContext.Provider
      value={{
        clientDetails: state.clientDetails,
        cardDetails: state.cardDetails,
        session: state.session,
        basketItems: state.basketItems,
        buyProducts,
        getTransactionDetails,
        emptyBasket,
      }}
    >
      {props.children}
    </CheckoutContext.Provider>
  );
};

export default CheckoutState;
