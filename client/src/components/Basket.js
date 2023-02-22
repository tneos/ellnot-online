import React, {useContext, useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {v4 as uuidv4} from "uuid";
import {Link} from "react-router-dom";
import Page from "./wrappers/Page";
import {getTotal} from "../utils/getTotal";
import {getDuplicates} from "../utils/getDuplicates";

import AuthContext from "../context/auth/authContext";

const Basket = () => {
  const authContext = useContext(AuthContext);

  const {isAuthenticated, user, basketItems, deleteBasketItem, changeSize} = authContext;

  const [content, setContent] = useState(false);

  let navigate = useNavigate();

  let itemSize, replacedItem;
  let basketArray = [];
  const waitBeforeShow = 1000;
  let itemToDelete;
  let countKeys = [];
  let sizedItems = [];

  let htmlContainer = document.createElement("div");

  // Delay rendering until data loaded
  useEffect(() => {
    const timer = setTimeout(() => {
      setContent(true);
    }, waitBeforeShow);
    return () => clearTimeout(timer);
  }, [waitBeforeShow]);

  htmlContainer.insertAdjacentHTML("afterbegin", basketItems);

  basketArray = [...htmlContainer.children];

  const {basketUnique, countValues, ids, options, optionsUnique} = getDuplicates(basketArray);

  // If user logged in link to checkout element
  const onCheckout = () => {
    isAuthenticated ? navigate("/checkout") : navigate("/myaccount");
  };

  // Select size
  const handleChange = e => {
    e.target.firstChild.value = e.target.value;

    let elementStrings = [];

    // Save descriptions and sized items only in array
    basketArray.map((element, index) => {
      element.setAttribute("id", ids[index]);

      if (element.lastChild.firstChild && element.lastChild.firstChild.firstChild) {
        element.lastChild.firstChild.firstChild.removeAttribute("value");
        element.lastChild.firstChild.firstChild.setAttribute("value", "select_size");

        sizedItems.push([
          element.lastChild.previousSibling.firstChild.innerText,
          e.target.parentElement.children[2].firstChild.value,
        ]);

        elementStrings.push(element.outerHTML);
      }
    });

    // If target element matches description of sized element change the size
    sizedItems.map((array, index) => {
      array[0] === e.target.parentElement.firstChild.innerText &&
        changeSize(
          elementStrings[index],
          e.target.parentElement.children[2].firstChild.value,
          user._id
        );
    });
  };

  // Delete current basket item
  const onDeleteBasketItem = item => {
    // If item exists replace current value with initial one and delete it
    if (item.target.parentElement.previousSibling.children[2].tagName === "SELECT") {
      itemSize = item.target.parentElement.previousSibling.children[2].firstChild.value;
    }

    basketItems &&
      basketArray.map((el, index) => {
        // Restore id attribute in order to match database's element
        el.setAttribute("id", ids[index]);

        // Check if image and size matches or if image matches(if no size specified)
        if (
          itemSize &&
          el.children[0].currentSrc ===
            item.target.parentElement.parentElement.firstChild.currentSrc &&
          el.children[3].firstChild.value === itemSize
        ) {
          replacedItem = el.outerHTML.replace(
            `name="Select size" value="` + options[index][0].value + `"`,
            `name="Select size" value="select_size"`
          );

          itemToDelete = replacedItem + "," + options[index][0].value;
        } else if (
          !itemSize &&
          el.children[0].currentSrc ===
            item.target.parentElement.parentElement.firstChild.currentSrc
        ) {
          itemToDelete = el.outerHTML;
        }
      });

    // Delete item from database
    deleteBasketItem(itemToDelete, user._id);
  };

  // Determine outnput
  let output;
  if (!isAuthenticated) {
    output = (
      <div className="empty">
        <div className="empty__container">
          <h3 className="empty__title">Shopping cart</h3>
          <h4 className="empty__description">You need to login to view your basket..</h4>
        </div>

        <div className="empty__banner"></div>
      </div>
    );
  } else if (basketArray.length === 0) {
    output = (
      <div className="empty">
        <div className="empty__container">
          <h3 className="empty__title">Shopping cart</h3>
          <h4 className="empty__description">Your basket is empty. Fill it with new styles</h4>
          <Link to="/women/jeans" className="empty__link">
            <button className="empty__button">SHOP NOW</button>
          </Link>
        </div>

        <div className="empty__banner"></div>
      </div>
    );
  } else {
    if (basketUnique.length > 0)
      output = (
        <div className="basket__container">
          <div className="shopping">
            <div className="shopping__cart-section">
              <h3 className="shopping__title">Shopping cart</h3>
              {basketUnique.map((el, index) => (
                <div className="shopping__cart" key={index}>
                  <div className="shopping__container">
                    <img
                      src={el.children[0].currentSrc}
                      alt={el.children[0].alt}
                      className="shopping__img"
                    />
                    <section className="description-size">
                      <h4 className="description-size__title">
                        {el.children[2].children[0].innerText}
                      </h4>
                      {optionsUnique[index].length > 1 ? (
                        <>
                          <h5 className="description-size__selection-title">Size</h5>

                          <select className="description-size__selection" onChange={handleChange}>
                            {optionsUnique[index].map(op => (
                              <option value={op.value} key={uuidv4()}>
                                Size {op.value.toUpperCase()}
                              </option>
                            ))}
                          </select>
                        </>
                      ) : (
                        <>
                          <h5 className="description-size__selection-title"></h5>
                          <div className="description-size__selection"></div>
                        </>
                      )}
                      {countKeys.some(key => key === el.children[2].innerText.split("£")[0])}{" "}
                      <p className="description-size__qty">Qty: {countValues[index]}</p>
                    </section>
                    <section className="price-tag">
                      <h4 className="price-tag__title">Price</h4>
                      {countKeys.some(key => key === el.children[2].innerText.split("£")[0])}{" "}
                      <p className="price-tag__price">
                        £
                        {parseFloat(
                          el.children[2].children[1].innerText.split("£")[1] * countValues[index]
                        ).toFixed(2)}
                      </p>
                      <button className="price-tag__btn" onClick={onDeleteBasketItem}></button>
                    </section>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="order-summary">
            <h3 className="order-summary__title">Order summary</h3>
            <div className="order-summary__main">
              {}
              <h4 className="order-summary__total">
                Total: £{getTotal(basketItems, basketArray).toFixed(2)}
              </h4>

              <input
                type="submit"
                value="Checkout"
                onClick={onCheckout}
                className="order-summary__btn"
              />

              <section className="order-summary__icons">
                <img
                  src="img/icons/american-express.png"
                  alt="american-express icon"
                  className="order-summary__icon"
                />
                <img
                  src="img/icons/paypal.png"
                  alt="paypal icon"
                  className="order-summary__icon"
                />
                <img src="img/icons/visa.png" alt="visa icon" className="order-summary__icon" />
                <img
                  src="img/icons/western-union.png"
                  alt="western-union icon"
                  className="order-summary__icon"
                />
              </section>
            </div>
          </div>
        </div>
      );
  }

  return (
    <Page title="Basket">
      <section className="basket">{!content ? null : output}</section>
    </Page>
  );
};

export default Basket;
