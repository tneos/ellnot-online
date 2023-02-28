import React, {useState, useContext, useEffect} from "react";
import {useLocation} from "react-router-dom";
import {useNavigate} from "react-router";

import {formatDate} from "../../utils/formatDate";

import CheckoutContext from "../../context/checkout/checkoutContext";
import AuthContext from "../../context/auth/authContext";

const Complete = () => {
  const location = useLocation();

  const checkoutContext = useContext(CheckoutContext);
  const authContext = useContext(AuthContext);

  const [data, setData] = useState(null);

  const {getTransactionDetails, emptyBasket} = checkoutContext;
  const {user, loadUser} = authContext;

  let promise;
  const waitBeforeShow = 1000;

  useEffect(() => {
    promise = getTransactionDetails(location.search).then(result => {
      return result;
    });

    const customer = async () => {
      let data = await promise;
      setData(data);
    };

    customer();
    loadUser();
  }, [location.search]);

  let navigate = useNavigate();

  const onNavigate = () => {
    emptyBasket(user._id);
    setTimeout(() => {
      navigate("/");
    }, waitBeforeShow);
    //navigate("/");
  };

  return (
    data && (
      <div className="confirmation">
        <div className="confirmation__container">
          <h1 className="confirmation__title">Thank you for your order!</h1>
          <section className="confirmation__details">
            <div className="confirmation__group">
              <h4 className="confirmation__label">Email address</h4>
              <p className="confirmation__data">{data.customer.email}</p>
            </div>

            <div className="confirmation__group">
              <h4 className="confirmation__label">Contact number</h4>
              <p className="confirmation__data">07756347349</p>
            </div>

            <div className="confirmation__group">
              <h4 className="confirmation__label">Date of Payment</h4>
              <p className="confirmation__data">{formatDate(data.customer.created)}</p>
            </div>

            <div className="confirmation__group">
              <h4 className="confirmation__label">Time of Payment</h4>
              <p className="confirmation__data">{formatDate(data.customer.created)}</p>
            </div>

            <div className="confirmation__group">
              <h4 className="confirmation__label">Booking ID</h4>
              <p className="confirmation__data">{data.session.client_reference_id}</p>
            </div>

            <div className="confirmation__group">
              <h4 className="confirmation__label">Amount paid</h4>
              <p className="confirmation__data">£ {data.session.amount_total / 100}</p>
            </div>

            <div className="confirmation__group">
              <h4 className="confirmation__label">Payment Method</h4>
              <p className="confirmation__data">Credit card **49</p>
            </div>

            <button className="confirmation__btn" onClick={onNavigate}>
              Continue to Home
            </button>
          </section>
          <i className="confirmation__icon"></i>
        </div>
      </div>
    )
  );
};

export default Complete;
