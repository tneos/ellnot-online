import React, {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import Page from "./wrappers/Page";
import ItemContext from "../context/items/itemContext";
import AuthContext from "../context/auth/authContext";
import Items from "./Items";

import LoadingSpinner from "./wrappers/LoadingSpinner";

import {likedItem} from "../utils/likedItem";

const PriceBased = () => {
  const itemContext = useContext(ItemContext);
  const authContext = useContext(AuthContext);

  const [content, setContent] = useState(false);

  // Capitilize first character of type
  const capitalizeFirstLetter = string => string.charAt(0).toUpperCase() + string.slice(1);

  const {likedList, appData, getUnderPrice} = itemContext;
  const {user, favItems} = authContext;

  const {price} = useParams();

  let output;
  const waitBeforeShow = 800;
  let favArray = [];

  let wrapper = document.createElement("div");

  useEffect(() => {
    window.scrollTo(0, 0);

    getUnderPrice(price);

    const timer = setTimeout(() => {
      setContent(true);
    }, waitBeforeShow);
    setContent(false);
    return () => clearTimeout(timer);
    // eslint-disable-next-line
  }, [waitBeforeShow, price]);

  wrapper.innerHTML = likedList;
  wrapper.innerHTML = favItems;
  favArray = [...wrapper.children];

  if (appData && appData.length) {
    output = (
      <Page title={"Under £" + capitalizeFirstLetter(price)}>
        <section className="items">
          <h1 className="items__title">Under £{capitalizeFirstLetter(price)}</h1>
          <div className="items__container">
            {appData.map((item, index) =>
              !content ? (
                <LoadingSpinner key={index} />
              ) : (
                <Items
                  key={index}
                  userId={user && user._id}
                  item={item}
                  likedItem={
                    likedItem(favArray, item) ? (
                      <img
                        src={
                          process.env.REACT_APP_ENV !== "production"
                            ? "http://localhost:3000/img/filled-heart.png"
                            : `${process.env.REACT_APP_CLIENT_URL}/img/filled-heart.png`
                        }
                        alt="not liked"
                      />
                    ) : (
                      <img
                        src={
                          process.env.REACT_APP_ENV !== "production"
                            ? "http://localhost:3000/img/heart.png"
                            : `${process.env.REACT_APP_CLIENT_URL}/img/heart.png`
                        }
                        alt="not liked"
                      />
                    )
                  }
                />
              )
            )}
          </div>
        </section>
      </Page>
    );
  }

  return <>{output}</>;
};

export default PriceBased;
