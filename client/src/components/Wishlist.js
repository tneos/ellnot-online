import React, {useContext, useState, useEffect} from "react";
import {v4 as uuidv4} from "uuid";
import Page from "./wrappers/Page";
import ItemContext from "../context/items/itemContext";
import AuthContext from "../context/auth/authContext";

import {getObject} from "../utils/getObject";

const Wishlist = () => {
  // Initialize context
  const itemContext = useContext(ItemContext);
  const authContext = useContext(AuthContext);

  const {initialData, sizeOptions, likedList} = itemContext;
  const {isAuthenticated, user, favItems, basketItems, addToBasket, deleteSelected, deleteAll} =
    authContext;

  // Component state
  const [selection, setSelection] = useState([...sizeOptions]);
  const [content, setContent] = useState(false);
  const [size, setSize] = useState("Select size");

  // Component variables
  const waitBeforeShow = 1000;
  const stringToBeReplaced = `<button class="select__button">Add to basket</button>`;
  let elementArray, type;
  let types = [];

  // Delay rendering until data loaded
  useEffect(() => {
    const timer = setTimeout(() => {
      setContent(true);
    }, waitBeforeShow);
    return () => clearTimeout(timer);
  }, [waitBeforeShow]);

  // Initialize DOM elements
  let htmlContainer = document.createElement("div");
  let likedContainer = document.createElement("div");
  let basketContainer = document.createElement("div");

  basketItems &&
    basketItems.length > 0 &&
    basketContainer.insertAdjacentHTML("afterbegin", basketItems.slice(0, -4));

  htmlContainer.insertAdjacentHTML("afterbegin", favItems);

  likedContainer.insertAdjacentHTML("afterbegin", likedList);

  const favArray = [...htmlContainer.children];

  favArray.forEach((item, index) => {
    // Get the type of element
    elementArray = item.children[0].src.split("/");
    type = elementArray[elementArray.length - 1];
    type = type.split(".");

    // Check if second from the end character is a number or not
    let charToCheck = Number(type[0].slice(-2, -1));
    charToCheck ? types.push(type[0].slice(0, -2)) : types.push(type[0].slice(0, -1));

    // Get initial data
    getObject(initialData, types[index]);

    // Check description if type = "sales" or "summer-collection"
    if (types[index] === "sales" || types[index] === "summer-collection") {
      let description = item.firstChild.nextSibling.innerText;

      description.includes("heels") && (types[index] = "heels");
      description.includes("sunglasses") && (types[index] = "sunglasses");
      description.includes("cardigan") && (types[index] = "cardigan");
      description.includes("short") && (types[index] = "short");
      description.includes("shorts") && (types[index] = "shorts");
      description.includes("jumper") && (types[index] = "jumper");
      description.includes("dress") && (types[index] = "dress");
      description.includes("skirt") && (types[index] = "skirt");
      description.includes("bikini") && (types[index] = "bikini");
      description.includes("swimsuit") && (types[index] = "swimsuit");
      description.includes("kimono") && (types[index] = "kimono");
    }
  });

  // Delete current item

  const onDeleteCurrent = item => {
    favArray.forEach(i => {
      console.log(i.outerHTML);
      i.children[0].currentSrc === item.target.previousSibling.currentSrc &&
        deleteSelected(i.outerHTML, user._id);
    });
  };

  // Empty wishlist
  const onDelete = () => {
    deleteAll(user._id);
    localStorage.removeItem("wishlist");
    localStorage.removeItem("liked");
  };

  // Select size
  const handleChange = (e, index) => {
    let arrayOfData = [...selection];
    arrayOfData[index] = e.target.value;
    setSelection(arrayOfData);
    setSize(e.target.value);

    e.target.parentElement.lastChild.innerText = "Add to basket";
  };

  // Add to basket
  const onAdd = item => {
    const itemsToBuy = [];
    let filteredString;

    console.log(item.target.parentElement.parentElement.outerHTML);

    if (item.target.innerText === "Add to basket") {
      let itemToBuyHTML = item.target.parentElement.parentElement.outerHTML;
      let wrapper = document.createElement("div");
      wrapper.innerHTML = itemToBuyHTML;
      filteredString = itemToBuyHTML.replace(stringToBeReplaced, "");
      itemsToBuy.push(filteredString);

      size !== "Select size" && itemsToBuy.push(size);

      addToBasket(itemsToBuy, user._id);

      // Reset button message and size value
      size !== "Select size" && setSize("Select size");
      size !== "Select size" && (item.target.innerText = "Select size");
      item.target.previousSibling.value = "select_size";

      // Add to local storage
      !basketItems
        ? localStorage.setItem("basket", itemsToBuy)
        : localStorage.setItem("basket", itemsToBuy.concat(basketItems));
    }
  };
  // Default src of img
  const addDefaultSrc = e => {
    let number = e.target.alt.slice(e.target.alt.length - 1);
    e.target.src = `img/jeans/jeans${number}.jpg`;
  };

  // Determine outnput
  let output;
  if (!isAuthenticated) {
    output = (
      <div className="empty">
        <h1 className="empty__title">You need to login to view your wishlist.</h1>
      </div>
    );
  } else if (favArray.length === 0) {
    output = (
      <div className="empty">
        <h1 className="empty__title">You don't have any favourite items yet..</h1>
      </div>
    );
  } else {
    if (favArray.length > 0)
      output = (
        <div className="fav-container">
          {favArray.map((el, index) => (
            <div className={`fav-item ${el.className.slice(-1)}`} id={uuidv4()} key={index}>
              {el.children[1].currentSrc ? (
                <img
                  onError={addDefaultSrc}
                  className="fav-item__img"
                  src={el.children[1].currentSrc}
                  alt={el.children[1].alt}
                />
              ) : (
                <img
                  onError={addDefaultSrc}
                  className="fav-item__img"
                  src={el.children[0].currentSrc}
                  alt={el.children[0].alt}
                />
              )}

              <button className="fav-item__btn" onClick={onDeleteCurrent}>
                &nbsp;
              </button>
              {/*  Check if element is on offer or not */}
              <div className="fav-item__desc">
                {el.children[1].innerText ? (
                  <h3 className="fav-item__title">{el.children[1].innerText}</h3>
                ) : (
                  <h3 className="fav-item__title">{el.children[2].innerText}</h3>
                )}
                {el.children[3].innerText ? (
                  <h2 className="fav-item__price">{el.children[3].innerText}</h2>
                ) : (
                  <h2 className="fav-item__price">{el.children[4].innerText}</h2>
                )}
              </div>
              <div className="select">
                {(types[index] === "jeans" ||
                  types[index] === "tops" ||
                  types[index] === "dresses" ||
                  types[index] === "dress" ||
                  types[index] === "lingerie" ||
                  types[index] === "skirts" ||
                  types[index] === "skirt" ||
                  types[index] === "shorts" ||
                  types[index] === "short" ||
                  types[index] === "bikini" ||
                  types[index] === "swimsuit" ||
                  types[index] === "jumper") && (
                  <select className="select__selection" id={index + 1} onChange={handleChange}>
                    {sizeOptions.map((option, index) => (
                      <option name={option.waistLabel} value={option.waistValue} key={index}>
                        {option.waistLabel}
                      </option>
                    ))}
                  </select>
                )}
                {(types[index] === "cardigans" ||
                  types[index] === "cardigan" ||
                  types[index] === "kimono") && (
                  <select className="select__selection" id={index + 1} onChange={handleChange}>
                    {sizeOptions.map((option, index) => (
                      <option name={option.topsLabel} value={option.topsValue} key={index}>
                        {option.topsLabel}
                      </option>
                    ))}
                  </select>
                )}
                {(types[index] === "heels" || types[index] === "boots") && (
                  <select className="select__selection" id={index + 1} onChange={handleChange}>
                    {sizeOptions.map((option, index) => (
                      <option name={option.shoesLabel} value={option.shoesValue} key={index}>
                        {option.shoesLabel}
                      </option>
                    ))}
                  </select>
                )}
                {(types[index] === "hats" ||
                  types[index] === "sunglasses" ||
                  types[index] === "belts" ||
                  types[index] === "hats" ||
                  types[index] === "handbags" ||
                  types[index] === "accessories" ||
                  types[index] === "summer-collection" ||
                  types[index] === "candles") && <div className="select__selection"></div>}

                {types[index] === "hats" ||
                types[index] === "sunglasses" ||
                types[index] === "belts" ||
                types[index] === "hats" ||
                types[index] === "handbags" ||
                types[index] === "accessories" ||
                types[index] === "summer-collection" ||
                types[index] === "candles" ? (
                  <button className="select__button" onClick={onAdd}>
                    Add to basket
                  </button>
                ) : (
                  <button className="select__button" onClick={onAdd}>
                    Select size
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      );
  }

  return (
    <Page title="Wishlist">
      <section className="fav-section">
        {!isAuthenticated || favArray.length === 0 || !content ? (
          <h1 className="fav-section__title">Your wishlist</h1>
        ) : (
          <h1 className="fav-section__title">Your wishlist({favArray.length})</h1>
        )}

        <button className="fav-remove-all" onClick={onDelete}>
          {favArray.length > 0 ? "Remove all items" : ""}
        </button>
        {!content ? null : output}
      </section>
    </Page>
  );
};

export default Wishlist;
