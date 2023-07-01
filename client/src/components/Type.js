import React, {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import Page from "./wrappers/Page";

import ItemContext from "../context/items/itemContext";
import AuthContext from "../context/auth/authContext";
import Items from "./Items";
import LoadingSpinner from "../components/wrappers/LoadingSpinner";

import {likedItem} from "../utils/likedItem";

const Type = () => {
  const itemContext = useContext(ItemContext);
  const authContext = useContext(AuthContext);

  const [content, setContent] = useState(false);

  const {category, type} = useParams();

  const waitBeforeShow = 800;

  // Capitilize first character of type
  const capitalizeFirstLetter = string => string.charAt(0).toUpperCase() + string.slice(1);

  const {likedList, appData, getData} = itemContext;
  const {user, favItems} = authContext;
  //console.log(appData);

  useEffect(() => {
    window.scrollTo(0, 0);

    getData(category, type);

    const timer = setTimeout(() => {
      setContent(true);
    }, waitBeforeShow);
    setContent(false);
    return () => clearTimeout(timer);
  }, [waitBeforeShow, getData, category, type]);

  let favArray = [];
  let favArrayProd = [];
  //let likedArray = [];
  let output;

  let wrapper = document.createElement("div");

  wrapper.innerHTML = likedList;
  wrapper.innerHTML = favItems;
  favArray = [...wrapper.children];
  //likedArray = [...wrapper.children];

  process.env.REACT_APP_ENV === "production" &&
    appData &&
    favArray.forEach((item, index) => {
      let favArr = item.firstChild.src.slice(21).split("/");

      favArr.splice(0, 1);
      let favArrString = favArr.join("/");

      favArray[index].firstChild.src = "../" + favArrString;
      favArrayProd.push(favArray[index]);
    });

  // favArray.map(el => console.log(".." + el.firstChild.src.slice(21)));
  // appData && appData.length && appData.map(item => console.log(item.img));

  if (appData && appData.length) {
    output = (
      <Page title={capitalizeFirstLetter(type)}>
        <section className="items">
          <h1 className="items__title">{capitalizeFirstLetter(type)}</h1>
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
  } else {
    output = (
      <Page title={capitalizeFirstLetter(type)}>
        <section className="items">
          <h3 className="items__notification">
            Please allow some time for data to load as we're using server's free tier. Thank you
          </h3>
          <LoadingSpinner />
        </section>
      </Page>
    );
  }

  return <>{output}</>;
};

export default Type;
