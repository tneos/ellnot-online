import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
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

const history = createBrowserHistory();

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const stripePromise = loadStripe(
  "pk_test_51KkrCgA9g8GZZeGZNPLgtBF9bfHL16cwJBBA2whsWPlOihOl2WWbJYDOSeXVddlBJJaQVRlghy5I5aIZMIYhUfXq006Xs7WWjx"
);

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
                <Router history={history}>
                  <Routes>
                    <Route path="/" element={<App />}>
                      <Route
                        path="/mine"
                        element={
                          <PrivateRoute>
                            <MyAccount />
                          </PrivateRoute>
                        }
                      />
                      <Route path="/" element={<Home />} />
                      <Route path="/:category/:type" element={<Type />} />
                      <Route path="/under/:price" element={<PriceBased />} />
                      <Route path="/delivery" element={<Delivery />} />
                      <Route path="/returns" element={<Returns />} />
                      <Route path="/students" element={<Students />} />
                      <Route path="/regulars" element={<Regulars />} />
                      <Route path="/about-us" element={<AboutUs />} />
                      <Route path="/basket" element={<Basket />} />
                      <Route path="/wishlist" element={<Wishlist />} />

                      <Route path="/item/:desc" element={<Item />} />
                    </Route>

                    <Route
                      path="/checkout"
                      element={
                        <PrivateRoute>
                          <Checkout />
                        </PrivateRoute>
                      }
                    />

                    <Route path="/myaccount" exact element={<User />} />
                    <Route path="/payment_confirmation" element={<Complete />} />

                    <Route
                      path="/myaccount/signup"
                      exact
                      element={
                        <>
                          <Signup />
                          <SubMenus />
                        </>
                      }
                    />
                  </Routes>
                </Router>
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
