import React from "react";
import ReactDOM from "react-dom/client";
import {RouterProvider, createBrowserRouter} from "react-router-dom";
import {createBrowserHistory} from "history";

// Components
import App from "./App";
import User from "./components/user/User";
import MyAccount from "./components/user/MyAccount";
import Students from "./components/footer/Students";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Type from "./components/Type";
import PriceBased from "./components/PriceBased";

import Basket from "./components/Basket";
import Complete from "./components/payment/Complete";
import Wishlist from "./components/Wishlist";
import Checkout from "./components/payment/Checkout";
import SubMenus from "./components/SubMenus";
import Alerts from "./components/Alerts";
import setAuthToken from "./utils/setAuthToken";
import Delivery from "./components/footer/Delivery";
import Returns from "./components/footer/Returns";
import Regulars from "./components/footer/Regulars";
import AboutUs from "./components/footer/AboutUs";
import Error from "./components/Error";
import PrivateRoute from "./components/routing/PrivateRoute";

import Item from "./components/Item";

// Contexts
import SubMenuState from "./context/subMenu/SubMenuState";
import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";
import ItemState from "./context/items/ItemState";
import CheckoutState from "./context/checkout/CheckoutState";

// Stripe
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const stripePromise = loadStripe(
  "pk_test_51KkrCgA9g8GZZeGZNPLgtBF9bfHL16cwJBBA2whsWPlOihOl2WWbJYDOSeXVddlBJJaQVRlghy5I5aIZMIYhUfXq006Xs7WWjx"
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/mine",
        element: (
          <PrivateRoute>
            <MyAccount />
          </PrivateRoute>
        ),
      },
      {
        path: "/:category/:type",
        element: <Type />,
        errorElement: <Error />,
      },
      {
        path: "/under/:price",
        element: <PriceBased />,
      },
      {
        path: "/delivery",
        element: <Delivery />,
      },
      {
        path: "/returns",
        element: <Returns />,
      },
      {
        path: "/students",
        element: <Students />,
      },
      {
        path: "/regulars",
        element: <Regulars />,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/basket",
        element: <Basket />,
      },
      {
        path: "/wishlist",
        element: <Wishlist />,
      },
      {
        path: "/item/:desc",
        element: <Item />,
        errorElement: <Error />,
      },
    ],
  },
  {
    path: "/checkout",
    element: (
      <PrivateRoute>
        <Checkout />
      </PrivateRoute>
    ),
  },
  {
    path: "/myaccount",
    element: <User />,
  },
  {
    path: "/payment_confirmation",
    element: <Complete />,
  },
  {
    path: "/myaccount/signup",
    element: (
      <>
        <Signup />
        <SubMenus />
      </>
    ),
  },
]);

const Main = () => {
  const options = {
    // passing the client secret obtained from the server
    clientSecret: "pi_3Ko4f6A9g8GZZeGZ1HQFtpLV_secret_4YXkBYsuBK1YWFyfZxMBKTS8g",
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <SubMenuState>
        <AlertState>
          <ItemState>
            <AuthState>
              <CheckoutState>
                <Alerts />
                <RouterProvider router={router} />
              </CheckoutState>
            </AuthState>
          </ItemState>
        </AlertState>
      </SubMenuState>
    </Elements>
  );
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);
