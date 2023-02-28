import React, {useContext} from "react";
import {useNavigate} from "react-router-dom";
import PropTypes from "prop-types";

import ItemContext from "../context/items/itemContext";
import AuthContext from "../context/auth/authContext";
import AlertContext from "../context/alert/alertContext";
import SubMenuContext from "../context/subMenu/subMenuContext";

const Items = ({item, userId, likedItem}) => {
  // Initialize context
  const itemContext = useContext(ItemContext);
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
  const subMenuContext = useContext(SubMenuContext);

  let checkIfSale = item.img.slice(7, 12);
  let favArray = [];

  const navigate = useNavigate();
  const {id, img, description, price, discounted} = item;
  const {likedList, setLiked} = itemContext;
  const {favItems, addItem, isAuthenticated} = authContext;
  const {setAlert} = alertContext;
  const {deactivateAll} = subMenuContext;

  // Styling of discounted prices
  const previousPrice = {
    textDecoration: "line-through",
    display: "inline-block",
    width: "45%",
    opacity: "0.5",
  };

  const discount = {
    color: "#ff0000",
    display: "inline-block",
    width: "20%",
  };

  // Add an item to wishlist
  const onAdd = item => {
    let favItem;
    if (item.target.parentElement.firstChild.className === "item-card__sticker") {
      let discountWrapper = document.createElement("div");
      discountWrapper.innerHTML = item.target.parentElement.outerHTML;
      discountWrapper.firstChild.firstChild.remove();
      discountWrapper.firstChild.lastChild.previousSibling.remove();
      discountWrapper.firstChild.lastChild.removeAttribute("style");
      favItem = discountWrapper.firstChild.outerHTML;
    } else {
      favItem = item.target.parentElement.outerHTML;
    }

    const items = [];

    let wrapper = document.createElement("div");
    let className = item.target.className;

    if (!isAuthenticated) {
      navigate("/myaccount");
      setAlert("Please login in order to add items to your wishlist", "danger");
    } else {
      item.target.src = "../img/filled-heart.png";
      item.target.alt = "liked";
    }

    items.push(favItem);

    // If user authenticated add item to wishlist
    isAuthenticated && addItem(items, userId);
    setLiked(item.target.outerHTML);
    if (isAuthenticated) {
      !favItems
        ? localStorage.setItem("wishlist", items)
        : localStorage.setItem("wishlist", items.concat(favItems));
    }
    wrapper.innerHTML = likedList;
    favArray = [...wrapper.children];

    favArray.filter(el => el.className === className && (item.target.src = el.currentSrc));
  };

  const onItem = e => {
    let desc = e.target.nextSibling.innerHTML;

    const descArray = desc.split(" ");

    let modDesc = descArray.join("-").toLowerCase();
    deactivateAll();
    window.scrollTo(0, 0);
    navigate(`/item/${modDesc}`);
  };

  return (
    <div className={`item-card ${id}`} id={`item-card ${id}`}>
      {checkIfSale === "sales" ? (
        <>
          <img
            className="item-card__sticker"
            src={
              process.env.REACT_APP_ENV !== "production"
                ? "http://localhost:3000/img/sale.png"
                : `${process.env.REACT_APP_CLIENT_URL}/img/sale.png`
            }
            alt="sticker"
          />
        </>
      ) : (
        <></>
      )}

      <img className="item-card__img" src={img} alt={`top-${id}`} onClick={onItem} />
      <h3 className="item-card__title">{description}</h3>
      {process.env.REACT_APP_ENV !== "production" ? (
        likedItem.props.src === "http://localhost:3000/img/heart.png" ? (
          <img
            className={`item-card__heart ${id}`}
            src={likedItem.props.src}
            alt="not liked"
            onClick={onAdd}
          />
        ) : (
          <img className={`item-card__heart ${id}`} src="../../img/filled-heart.png" alt="liked" />
        )
      ) : likedItem.props.src === `${process.env.REACT_APP_CLIENT_URL}/img/heart.png` ? (
        <img
          className={`item-card__heart ${id}`}
          src={likedItem.props.src}
          alt="not liked"
          onClick={onAdd}
        />
      ) : (
        <img
          className={`item-card__heart ${id}`}
          src={`${process.env.REACT_APP_CLIENT_URL}/img/filled-heart.png`}
          alt="liked"
        />
      )}

      {checkIfSale === "sales" ? (
        <>
          <h4 style={discount} className="item-card__discounted-price">
            {discounted}
          </h4>
          <h4 style={previousPrice} className="item-card__price">
            {price}
          </h4>
        </>
      ) : (
        <h4 className="item-card__price">{price}</h4>
      )}
    </div>
  );
};

Items.propTypes = {
  item: PropTypes.object.isRequired,
};

export default Items;
