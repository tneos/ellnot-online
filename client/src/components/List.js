import React, {Fragment, useContext, useState} from "react";
import {useNavigate} from "react-router-dom";

import ItemContext from "../context/items/itemContext";
import SubMenuContext from "../context/subMenu/subMenuContext";

const List = ({menu, initialData}) => {
  const itemContext = useContext(ItemContext);
  const subMenuContext = useContext(SubMenuContext);
  const navigate = useNavigate();

  // Initialize context
  const {getData, clearData, resetSearchBar, setInput} = itemContext;
  const {disableMobileSearchBar, disableDesktopSearchBar} = subMenuContext;

  // Component state
  const [activeMenu, setActiveMenu] = useState({
    active1: false,
    active2: false,
    active3: false,
    menu1: [false, false, false, false, false, false, false, false],
    activeLink: false,
  });

  // Variables
  let waitBeforeShow = 500;
  let links, link, category, pick, choice, category1, category2;
  let descriptions = [];
  let clothing = [];
  let clothingList = [];
  let accList = [];
  let accessories = [];
  let list = [];

  // Add all data in single array
  if (initialData !== null) {
    initialData.map(obj => {
      Object.keys(obj)
        .slice(2)
        .map(array => clothing.push(array));
      category1 = Object.values(obj)[1];
    });
  }

  clothing.map(item => clothingList.push(item.toLowerCase() + " in " + category1.toLowerCase()));
  accessories.map(item => accList.push(item.toLowerCase() + " in " + category2.toLowerCase()));

  menu.map(el => {
    category = el.split(" ");
    category1 = category[category.length - 1];
  });

  menu.map(item => {
    list.push(item);
  });

  const onSelect = e => {
    pick = e.target.textContent;

    let path = pick.split(" ");

    // Request to a category of items to back end
    getData(path[path.length - 2], path[path.length - 1]);
    resetSearchBar();
    setInput("");

    list.length > 0
      ? (choice = list.find(description => (choice = description === pick.toLowerCase())))
      : (choice = descriptions.find(description => description === pick.toLowerCase()));

    links = choice.split(" ");
    choice = links.join("-");
    disableDesktopSearchBar();

    if (category1) {
      disableMobileSearchBar();
      setTimeout(clearData, waitBeforeShow);
      setTimeout(
        () => navigate(`/${links[links.length - 1].toLowerCase()}/${links[0]}`),
        waitBeforeShow
      );
    } else {
      disableMobileSearchBar();
      setTimeout(clearData, waitBeforeShow);
      setTimeout(() => navigate(`/item/${choice}`), waitBeforeShow);
    }
  };

  const onHover = e => {
    e.preventDefault();
    link = e.target.innerText;

    menu.map((val, index) => {
      if (val === link) {
        const newState = {...activeMenu, menu1: [...activeMenu.menu1]};

        newState.menu1[index] = true;
        setActiveMenu(newState);
      }
    });
  };

  const onLeave = e => {
    e.preventDefault();
    link = e.target.innerText;

    menu.map((val, index) => {
      if (val === link) {
        const newState = {...activeMenu, menu1: [...activeMenu.menu1]};

        newState.menu1[index] = false;
        setActiveMenu(newState);
      }
    });
  };

  return (
    <Fragment>
      {menu.map((item, index) => (
        <li
          className={activeMenu.menu1[index] ? "dataResult__link-active" : "dataResult__link"}
          onClick={onSelect}
          onMouseOver={onHover}
          onMouseOut={onLeave}
          key={index}
        >
          {item}
        </li>
      ))}
    </Fragment>
  );
};

export default List;
