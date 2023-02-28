import React, {useContext, useState, useEffect} from "react";
import {v4 as uuidv4} from "uuid";
import {useParams} from "react-router-dom";

import Page from "./wrappers/Page";

import {likedItem} from "../utils/likedItem";

import AuthContext from "../context/auth/authContext";
import AlertContext from "../context/alert/alertContext";
import ItemContext from "../context/items/itemContext";

const Item = () => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
  const itemContext = useContext(ItemContext);

  const [selected, setSelected] = useState([false, false, false, false, false, false, false]);
  const [itemToBuy, setItemToBuy] = useState([]);
  const [itemString, setItemString] = useState("");

  const {favItems, user, basketItems, addItem, addToBasket} = authContext;
  const {setAlert} = alertContext;
  const {initialData, getAllData, getIndvItem} = itemContext;

  let clothingCat = [];
  let shoesAccessoriesCat = [];
  let summerCollectionCat = [];

  let clothElement,
    shoesAccElement,
    summerElement,
    element,
    elementArray,
    type,
    elDesc,
    itemDesc,
    size,
    lastChar,
    clothIndex,
    shoesAccIndex,
    summerIndex,
    category1,
    category2,
    category3,
    clothingKeys,
    shoesAccessoriesKeys,
    summerCollectionKeys;

  let clothing, shoesAccessories, summerCollection;

  // Get item description from query
  let {desc} = useParams();

  // // Get all data from local storage
  let data = window.localStorage.getItem("item");

  data = JSON.parse(data);

  let wrapper = document.createElement("div");
  let wrapperItem = document.createElement("div");

  // Get array of DOM elements
  wrapper.innerHTML = favItems;
  const favArray = [...wrapper.children];

  const descArray = desc.split("-");

  let modDesc = descArray.join(" ");

  [clothing, shoesAccessories, summerCollection] = initialData;

  if (clothing && shoesAccessories && summerCollection) {
    category1 = Object.values(clothing[0])[1].toLowerCase();
    Object.values(clothing[0])
      .slice(2, Object.values(clothing[0]).length - 1)
      .map(array => clothingCat.push(array));
    clothingKeys = Object.keys(clothing[0]).slice(2, Object.keys(clothing[0]).length - 1);

    category2 = Object.values(shoesAccessories[0])[1].toLowerCase();
    Object.values(shoesAccessories[0])
      .slice(2, Object.values(shoesAccessories[0]).length - 1)
      .map(array => shoesAccessoriesCat.push(array));
    shoesAccessoriesKeys = Object.keys(shoesAccessories[0]).slice(
      2,
      Object.keys(shoesAccessories[0]).length - 1
    );

    category2 = category2.split("-");
    category2 = category2.join("_");

    category3 = Object.values(summerCollection[0])[1].split(" ");
    category3 = category3.join("_");
    Object.values(summerCollection[0])
      .slice(2, Object.values(summerCollection[0]).length - 1)
      .map(array => summerCollectionCat.push(array));
    summerCollectionKeys = Object.keys(summerCollection[0]).slice(
      2,
      Object.keys(summerCollection[0]).length - 1
    );
  }

  // Find object that satisfies the condition
  clothElement =
    clothingCat &&
    clothingCat.find((array, index) => {
      typeof array === "object" &&
        (elDesc = array.find(obj => obj.description.toLowerCase() === modDesc));
      if (elDesc) {
        clothIndex = index;
      }

      return elDesc;
    });

  shoesAccElement =
    shoesAccessoriesCat &&
    shoesAccessoriesCat.find((array, index) => {
      typeof array === "object" &&
        (elDesc = array.find(obj => obj.description.toLowerCase() === modDesc));
      shoesAccIndex = index;
      return elDesc;
    });

  summerElement =
    summerCollectionCat &&
    summerCollectionCat.find((array, index) => {
      typeof array === "object" &&
        (elDesc = array.find(obj => obj.description.toLowerCase() === modDesc));
      elDesc && (summerIndex = index);
      return elDesc;
    });

  // Find right element in that object
  clothElement =
    clothElement && clothElement.find(obj => obj.description.toLowerCase() === modDesc);
  shoesAccElement =
    shoesAccElement && shoesAccElement.find(obj => obj.description.toLowerCase() === modDesc);
  summerElement =
    summerElement && summerElement.find(obj => obj.description.toLowerCase() === modDesc);

  typeof clothElement === "object" && (element = clothElement);
  typeof shoesAccElement === "object" && (element = shoesAccElement);
  typeof summerElement === "object" && (element = summerElement);

  // Get the type of element -- if data not fetched get item from local storage
  element ? (elementArray = element.img.split("/")) : (elementArray = data.img.split("/"));
  element ? (itemDesc = element.description) : (itemDesc = data.description);
  !element && (element = data);
  type = elementArray[elementArray.length - 1];
  type = type.split(".");

  // Check last character of type
  lastChar = Number(type[0].slice(-2));
  lastChar ? (type = type[0].slice(0, -2)) : (type = type[0].slice(0, -1));

  // If element exists send request to back end
  useEffect(() => {
    getAllData();
    window.scrollTo(0, 0);
    // console.log(category1, clothingKeys[clothIndex], clothElement.id, initialData);

    if (clothElement && initialData) {
      getIndvItem(category1, clothingKeys[clothIndex], clothElement.id);
    } else if (shoesAccElement && initialData) {
      getIndvItem(category2, shoesAccessoriesKeys[shoesAccIndex], shoesAccElement.id);
    } else if (summerElement && initialData) {
      getIndvItem(category3, summerCollectionKeys[summerIndex], summerElement.id);
    }

    // Construct basket element to be sent to database
    wrapperItem.className = `fav-item ${element.id}`;

    let image = document.createElement("img");
    image.className = "fav-item__img";
    let button = document.createElement("button");
    button.className = "fav-item__btn";
    button.innerHTML = "&nbsp;";
    let descriptionDiv = document.createElement("div");
    descriptionDiv.className = "fav-item__desc";
    let description = document.createElement("h3");
    description.className = "fav-item__title";
    let price = document.createElement("h2");
    price.className = "fav-item__price";

    description.innerHTML = element.description;
    price.innerHTML = element.price;

    image.src = "http://localhost:3000" + element.img.slice(2);
    image.alt = "Item image";
    wrapperItem.appendChild(image);
    wrapperItem.appendChild(button);

    wrapperItem.appendChild(descriptionDiv);
    descriptionDiv.appendChild(description);
    descriptionDiv.appendChild(price);
    let selectDiv = document.createElement("div");
    selectDiv.className = "select";
    wrapperItem.appendChild(selectDiv);

    // Conditional list of sizes depending on type -- (possible refactoring)
    if (
      type === "jeans" ||
      type === "tops" ||
      type === "dress" ||
      type === "dresses" ||
      type === "lingerie" ||
      type === "skirts" ||
      type === "skirt" ||
      type === "short" ||
      type === "shorts" ||
      type === "swimsuits"
    ) {
      let selectEl = document.createElement("select");

      selectEl.className = "select__selection";
      selectEl.id = element.id;
      selectEl.innerHTML = `<option name="Select size" value="select_size">Select size</option><option name="Size 6" value="6">Size 6</option><option name="Size 8" value="8">Size 8</option><option name="Size 10" value="10">Size 10</option><option name="Size 12" value="12">Size 12</option><option name="Size 14" value="14">Size 14</option><option name="Size 16" value="16">Size 16</option><option name="Size 18" value="18">Size 18</option>`;
      wrapperItem.appendChild(selectDiv);
      selectDiv.appendChild(selectEl);
      setItemString(wrapperItem.outerHTML);
    } else if (type === "boots" || type === "heels") {
      let selectEl = document.createElement("select");

      selectEl.className = "select__selection";
      selectEl.id = element.id;
      selectEl.innerHTML = `<option name="Select size" value="select_size">Select size</option><option name="Size 3" value="3">Size 3</option><option name="Size 4" value="4">Size 4</option><option name="Size 5" value="5">Size 5</option><option name="Size 6" value="6">Size 6</option><option name="Size 7" value="7">Size 7</option><option name="Size 8" value="8">Size 8</option><option name="Size 9" value="9">Size 9</option>`;
      wrapperItem.appendChild(selectDiv);
      selectDiv.appendChild(selectEl);
      setItemString(wrapperItem.outerHTML);
    } else if (
      type === "cardigans" ||
      type === "cardigan" ||
      type === "jumper" ||
      type === "bikini"
    ) {
      let selectEl = document.createElement("select");

      selectEl.className = "select__selection";
      selectEl.id = element.id;
      selectEl.innerHTML = `<option name="Select size" value="select_size">Select size</option><option name="Size XXS" value="xxs">Size XXS</option><option name="Size XS" value="xs">Size XS</option><option name="Size S" value="s">Size S</option><option name="Size M" value="m">Size M</option><option name="Size L" value="l">Size L</option><option name="Size XL" value="xl">Size XL</option><option name="Size XXL" value="xxl">Size XXL</option>`;
      wrapperItem.appendChild(selectDiv);
      selectDiv.appendChild(selectEl);
      setItemString(wrapperItem.outerHTML);
    } else {
      setItemString(wrapperItem.outerHTML);
    }
  }, [desc]);

  // Scan description for key value
  (type === "sales" || type === "summer-collection") &&
    itemDesc.includes("heels") &&
    (type = "heels");
  (type === "sales" || type === "summer-collection") &&
    itemDesc.includes("sunglasses") &&
    (type = "sunglasses");
  (type === "sales" || type === "summer-collection") &&
    itemDesc.includes("cardigan") &&
    (type = "cardigan");
  (type === "sales" || type === "summer-collection") &&
    itemDesc.includes("short") &&
    (type = "short");
  (type === "sales" || type === "summer-collection") &&
    itemDesc.includes("shorts") &&
    (type = "shorts");
  (type === "sales" || type === "summer-collection") &&
    itemDesc.toLowerCase().includes("jumper") &&
    (type = "jumper");
  (type === "sales" || type === "summer-collection") &&
    itemDesc.includes("dress") &&
    (type = "dress");
  (type === "sales" || type === "summer-collection") &&
    itemDesc.includes("skirt") &&
    (type = "skirt");

  (type === "sales" || type === "summer-collection") &&
    itemDesc.includes("bikini") &&
    (type = "bikini");
  (type === "sales" || type === "summer-collection") &&
    itemDesc.includes("swimsuit") &&
    (type = "swimsuits");

  const onSelectSize = e => {
    let id = e.target.id;
    size = e.target.innerHTML;

    size &&
      setItemToBuy(prev => {
        let newState;

        newState = [...prev, size];

        // If more than one sizes clicked keep only last option
        if (newState.length < 2) return newState;
        return [newState[newState.length - 1]];
      });

    setSelected(prevState => {
      const newState = [...prevState];

      const updated = newState.map((option, index) => index === id - 1 && (option = true));

      return updated;
    });
  };

  const onBuy = () => {
    // Get the element and add random id
    let wrapper = document.createElement("div");
    wrapper.innerHTML = itemString;
    wrapper.firstChild.id = uuidv4();
    let string = wrapper.firstChild.outerHTML;

    if (
      string !== "<div></div>" &&
      string &&
      (selected.find(el => el === true) ||
        type === "candles" ||
        type === "hats" ||
        type === "sunglasses" ||
        type === "belts" ||
        type === "hats" ||
        type === "handbags" ||
        type === "accessories" ||
        type === "summer-collection")
    ) {
      itemToBuy.unshift(string);
    }

    // Add to local storage and database
    if (itemToBuy.length > 0 && user) {
      !basketItems
        ? localStorage.setItem("basket", itemToBuy)
        : localStorage.setItem("basket", itemToBuy.concat(basketItems));

      // Add item to database and reset item picked

      if (
        selected.find(el => el === true) ||
        type === "candles" ||
        type === "hats" ||
        type === "sunglasses" ||
        type === "belts" ||
        type === "hats" ||
        type === "handbags" ||
        type === "accessories" ||
        type === "summer-collection"
      ) {
        addToBasket(itemToBuy, user._id);
      }

      // Reset size option when you buy an item
      setSelected(prev => {
        const newState = [...prev];
        let updated = newState.map(option => (option = false));
        return updated;
      });

      itemToBuy.length = 0;
    } else if (!user) {
      window.scrollTo(0, 0);
      setAlert("Please login in order to add to your basket", "danger");
    } else {
      window.scrollTo(0, 0);
      setAlert("Choose your size before you add to your basket", "danger");
    }
  };

  const onLike = e => {
    let target = e.target.parentElement.parentElement.parentElement;
    let imgSrc = target.firstChild.firstChild.src;
    const itemToLike = [];

    // Construct liked element to be sent to database
    wrapperItem.className = `item-card ${element.id}`;
    let image = document.createElement("img");
    image.className = "item-card__img";
    image.src = imgSrc;
    image.alt = "Item image";
    let description = document.createElement("h3");
    description.innerHTML = element.description;
    description.className = "item-card__title";
    let imageLiked = document.createElement("img");
    imageLiked.className = `item-card__heart ${element.id}`;
    let price = document.createElement("h3");
    price.className = "item-card__price";
    price.innerHTML = element.price;

    wrapperItem.appendChild(image);
    wrapperItem.appendChild(description);
    wrapperItem.appendChild(imageLiked);
    wrapperItem.appendChild(price);

    itemToLike.push(wrapperItem.outerHTML);

    // Add to local storage and database
    if (user) {
      !basketItems
        ? localStorage.setItem("wishlist", itemToLike)
        : localStorage.setItem("wishlist", itemToLike.concat(favItems));
      addItem(itemToLike, user._id);

      e.target.src = "../img/filled-heart.png";
      e.target.alt = "liked";
    } else {
      window.scrollTo(0, 0);
      setAlert("Please login in order to add to your basket", "danger");
    }
  };

  return (
    <Page title="item">
      {element ? (
        <div className="component-container">
          <div className="image-container">
            <img src={element.img} className="image-container__img" />
          </div>

          <div className="details">
            <div className="details__title">
              <h3 className="details__name">{element.description}</h3>
              {process.env.REACT_APP_ENV !== "production" ? (
                likedItem(favArray, element) ? (
                  <img
                    className="details__icon"
                    src="http://localhost:3000/img/filled-heart.png"
                    alt="not liked"
                  />
                ) : (
                  <img
                    className="details__icon"
                    src="http://localhost:3000/img/heart.png"
                    alt="not liked"
                    onClick={onLike}
                  />
                )
              ) : likedItem(favArray, element) ? (
                <img
                  className="details__icon"
                  src={`${process.env.REACT_APP_CLIENT_URL}/img/filled-heart.png`}
                  alt="not liked"
                />
              ) : (
                <img
                  className="details__icon"
                  src={`${process.env.REACT_APP_CLIENT_URL}/img/heart.png`}
                  alt="not liked"
                  onClick={onLike}
                />
              )}
            </div>
            <h4 className="details__price">{element.price}</h4>

            {(type === "jeans" ||
              type === "tops" ||
              type === "dresses" ||
              type === "dress" ||
              type === "lingerie" ||
              type === "skirts" ||
              type === "skirt" ||
              type === "shorts" ||
              type === "short" ||
              type === "cardigans" ||
              type === "cardigan" ||
              type === "bikini" ||
              type === "swimsuits" ||
              type === "jumper" ||
              type === "heels" ||
              type === "boots") && (
              <ul className="details__sizes">
                <li
                  className={selected[0] ? "details__size selected" : "details__size"}
                  id="1"
                  onClick={onSelectSize}
                >
                  {type === "cardigans" ||
                  type === "cardigan" ||
                  type === "jumper" ||
                  type === "bikini"
                    ? "XXS"
                    : type === "heels" || type === "boots"
                    ? 3
                    : 6}
                </li>

                <li
                  className={selected[1] ? "details__size selected" : "details__size"}
                  id="2"
                  onClick={onSelectSize}
                >
                  {type === "cardigans" ||
                  type === "cardigan" ||
                  type === "jumper" ||
                  type === "bikini"
                    ? "XS"
                    : type === "heels" || type === "boots"
                    ? 4
                    : 8}
                </li>
                <li
                  className={selected[2] ? "details__size selected" : "details__size"}
                  id="3"
                  onClick={onSelectSize}
                >
                  {type === "cardigans" ||
                  type === "cardigan" ||
                  type === "jumper" ||
                  type === "bikini"
                    ? "S"
                    : type === "heels" || type === "boots"
                    ? 5
                    : 10}
                </li>
                <li
                  className={selected[3] ? "details__size selected" : "details__size"}
                  id="4"
                  onClick={onSelectSize}
                >
                  {type === "cardigans" ||
                  type === "cardigan" ||
                  type === "jumper" ||
                  type === "bikini"
                    ? "M"
                    : type === "heels" || type === "boots"
                    ? 6
                    : 12}
                </li>
                <li
                  className={selected[4] ? "details__size selected" : "details__size"}
                  id="5"
                  onClick={onSelectSize}
                >
                  {type === "cardigans" ||
                  type === "cardigan" ||
                  type === "jumper" ||
                  type === "bikini"
                    ? "L"
                    : type === "heels" || type === "boots"
                    ? 7
                    : 14}
                </li>
                <li
                  className={selected[5] ? "details__size selected" : "details__size"}
                  id="6"
                  onClick={onSelectSize}
                >
                  {type === "cardigans" ||
                  type === "cardigan" ||
                  type === "jumper" ||
                  type === "bikini"
                    ? "XL"
                    : type === "heels" || type === "boots"
                    ? 8
                    : 16}
                </li>
                <li
                  className={selected[6] ? "details__size selected" : "details__size"}
                  id="7"
                  onClick={onSelectSize}
                >
                  {type === "cardigans" ||
                  type === "cardigan" ||
                  type === "jumper" ||
                  type === "bikini"
                    ? "XXL"
                    : type === "heels" || type === "boots"
                    ? 9
                    : 18}
                </li>
              </ul>
            )}

            <button className="details__button" onClick={onBuy}>
              ADD TO BASKET
            </button>
          </div>
        </div>
      ) : (
        <div className="component-container">
          <div className="image-container">
            <img src={data.img} className="image-container__img" />
          </div>

          <div className="details">
            <div className="details__title">
              <h3 className="details__name">{data.description}</h3>
              {likedItem(favArray, element) ? (
                <img
                  className="details__icon"
                  src="http://localhost:3000/img/filled-heart.png"
                  alt="not liked"
                />
              ) : (
                <img
                  className="details__icon"
                  src="http://localhost:3000/img/heart.png"
                  alt="not liked"
                  onClick={onLike}
                />
              )}
            </div>
            <h4 className="details__price">{data.price}</h4>

            <ul className="details__sizes">
              <li
                className={selected[0] ? "details__size selected" : "details__size"}
                id="1"
                onClick={onSelectSize}
              >
                6
              </li>

              <li
                className={selected[1] ? "details__size selected" : "details__size"}
                id="2"
                onClick={onSelectSize}
              >
                8
              </li>
              <li
                className={selected[2] ? "details__size selected" : "details__size"}
                id="3"
                onClick={onSelectSize}
              >
                10
              </li>
              <li
                className={selected[3] ? "details__size selected" : "details__size"}
                id="4"
                onClick={onSelectSize}
              >
                12
              </li>
              <li
                className={selected[4] ? "details__size selected" : "details__size"}
                id="5"
                onClick={onSelectSize}
              >
                14
              </li>
              <li
                className={selected[5] ? "details__size selected" : "details__size"}
                id="6"
                onClick={onSelectSize}
              >
                16
              </li>
              <li
                className={selected[6] ? "details__size selected" : "details__size"}
                id="7"
                onClick={onSelectSize}
              >
                18
              </li>
            </ul>

            <button className="details__button" onClick={onBuy}>
              ADD TO BASKET
            </button>
          </div>
        </div>
      )}
    </Page>
  );
};

export default Item;
