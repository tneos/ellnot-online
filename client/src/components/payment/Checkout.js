import React, {useState, useContext, useEffect} from "react";
import {getTotal} from "../../utils/getTotal";
import {getDuplicates} from "../../utils/getDuplicates";
import Page from "../wrappers/Page";

import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";
import CheckoutContext from "../../context/checkout/checkoutContext";

const Checkout = () => {
  // Initialize context
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  const checkoutContext = useContext(CheckoutContext);

  const {setAlert} = alertContext;
  const {user, basketItems} = authContext;
  const {clientDetails, buyProducts} = checkoutContext;

  // Component state
  const [form, setform] = useState(clientDetails);
  const {title, fullName, phone, fullAddress, postCode, deliveryOptions} = form;

  // Variables
  const {_id} = user;
  const filteredArray = [];
  let countKeys = [];
  let htmlContainer = document.createElement("div");
  let item;

  htmlContainer.insertAdjacentHTML("afterbegin", basketItems);
  const basketArray = [...htmlContainer.children];

  const {basketUnique, countValues, optionsUnique} = getDuplicates(basketArray);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onChange = e => user && setform({...form, id: _id, [e.target.name]: e.target.value});

  const onSubmit = e => {
    e.preventDefault();
    if (!fullName || !phone || !fullAddress || !postCode || !deliveryOptions) {
      setAlert("Please enter all fields", "danger");
      window.scrollTo(0, 0);
    } else {
      let total = getTotal(basketItems, basketArray).toFixed(2);
      buyProducts(form, filteredArray, _id, total);
    }
  };

  return (
    <Page title="Checkout">
      <div className="checkout">
        <div className="company-logo">
          <h1 className="company-logo__title">Ellnot</h1>
        </div>
        <div className="checkout__container">
          <form action="" className="checkout-form" onSubmit={onSubmit}>
            <h1 className="checkout-form__title">Please enter your details</h1>
            <div className="form-block">
              <div className="form-group">
                <label className="label" htmlFor="title">
                  Title
                </label>
                <select
                  name="title"
                  className="form-group__select"
                  value={title}
                  onChange={onChange}
                >
                  <option value="title">Title</option>
                  <option value="Mr">Mr</option>
                  <option value="Mrs">Mrs</option>
                  <option value="Miss">Miss</option>
                  <option value="Ms">Ms</option>
                  <option value="Dr">Dr</option>
                </select>
              </div>
              <div className="form-group--2">
                <label className="label" htmlFor="fullName">
                  Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  className="form-group--2__input"
                  value={fullName}
                  onChange={onChange}
                />
              </div>
            </div>

            <div className="form-block">
              <div className="form-group">
                <label className="label" htmlFor="phone">
                  Phone
                </label>
                <input
                  type="number"
                  name="phone"
                  className="form-group__input"
                  value={phone}
                  onChange={onChange}
                />
              </div>
              <div className="form-group--2">
                <label className="label" htmlFor="fullAddress">
                  Full address
                </label>
                <input
                  type="text"
                  name="fullAddress"
                  className="form-group--2__input"
                  value={fullAddress}
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="form-block">
              <div className="form-group">
                <label className="label" htmlFor="postCode">
                  Post code
                </label>
                <input
                  type="text"
                  name="postCode"
                  className="form-group__input"
                  value={postCode}
                  onChange={onChange}
                />
              </div>
              <div className="form-group--2">
                <label className="label" htmlFor="deliveryOptions">
                  Delivery options
                </label>
                <select
                  name="deliveryOptions"
                  className="form-group--2__input"
                  value={deliveryOptions}
                  onChange={onChange}
                >
                  <option value="select">Select delivery option</option>
                  <option value="Deliver to your home or business address">
                    Deliver to your home or business address
                  </option>
                  <option value="Collect from your local shop">
                    Collect from your local shop
                  </option>
                </select>
              </div>
            </div>

            <input type="submit" value="Next" className="checkout-form__btn" />
          </form>

          <section className="checkout-bag">
            <h3 className="checkout-bag__title">My basket</h3>
            {basketUnique.map((el, index) => (
              <div className="checkout-bag__container" key={index}>
                <img
                  src={el.children[0].currentSrc}
                  alt={el.children[0].alt}
                  className="checkout-bag__img"
                />
                <div className="checkout-bag__description">
                  <h4 className="checkout-bag__description-title">
                    {el.children[2].children[0].innerHTML}
                  </h4>
                  <p className="checkout-bag__price">{el.children[2].children[1].innerHTML}</p>
                  <div className="checkout-bag__details">
                    {countKeys.some(key => key === el.children[2].innerText.split("£")[0])}{" "}
                    <p className="checkout-bag__text">Qty: {countValues[index]}</p>
                    {optionsUnique[index].length > 1 && (
                      <p className="checkout-bag__text">
                        Size: {optionsUnique[index][0].value.toUpperCase()}{" "}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <h5 className="total-amount">
              Total: £{getTotal(basketItems, basketArray).toFixed(2)}
            </h5>
          </section>
        </div>
        <div className="checkout-footer">
          <p className="checkout-footer__copyright">&copy; 2021 Ellnot Company</p>
        </div>
      </div>
    </Page>
  );
};

export default Checkout;
