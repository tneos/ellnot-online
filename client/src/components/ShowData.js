import {Fragment, useContext, useState} from "react";
import {useNavigate} from "react-router-dom";

import ItemContext from "../context/items/itemContext";
import SubMenuContext from "../context/subMenu/subMenuContext";

import List from "./List";

const ShowData = ({data}) => {
  const itemContext = useContext(ItemContext);
  const subMenuContext = useContext(SubMenuContext);
  const navigate = useNavigate();

  // Initialize context
  const {initialData, clearData, getData, resetSearchBar, setInput} = itemContext;
  const {disableMobileSearchBar, disableDesktopSearchBar} = subMenuContext;

  // Component state
  const [activeMenu, setActiveMenu] = useState({
    active1: false,
    active2: false,
    active3: false,
    activeLink: false,
    allOptions: true,
  });

  // Variables
  let waitBeforeShow = 500;
  let links, category, pick, choice, category1, category2, category3;
  let descriptions = [];
  let clothingList = [];
  let accList = [];
  let summerList = [];
  let clothing = [];
  let accessories = [];
  let summerCollection = [];
  let keys = [];
  let typeOfItems, individualItem, allItems, noItems;

  // Add all data in single array
  if (initialData.length > 0) {
    initialData.map((array, index) => {
      if (index === 0) {
        Object.keys(array[0])
          .slice(2, Object.keys(array[0]).length - 2)
          .map(array => clothing.push(array));
        category1 = Object.values(array[0])[1];
      }

      if (index === 1) {
        Object.keys(array[0])
          .slice(2, Object.keys(array[0]).length - 2)
          .map(array => accessories.push(array));
        category2 = Object.values(array[0])[1];
      }

      if (index === 2) {
        Object.keys(array[0])
          .slice(2, Object.keys(array[0]).length - 1)
          .map(array => summerCollection.push(array));
        category3 = Object.values(array[0])[1];
      }
    });
  }

  clothing.map(item => clothingList.push(item.toLowerCase() + " in " + category1.toLowerCase()));
  accessories.map(item => accList.push(item.toLowerCase() + " in " + category2.toLowerCase()));
  summerCollection.map(item =>
    summerList.push(item.toLowerCase() + " in " + category3.toLowerCase())
  );

  // Add all categories in keys array
  keys = clothing.concat(accessories).concat(summerCollection);

  data.map(el => {
    category = el;

    // If category found
    if (typeof el === "string") {
      links = el.toLowerCase().split(" ");
      descriptions.push(links.join(" "));
    } else {
      el.description && (links = el.description.toLowerCase().split(" "));
      el.description && descriptions.push(links.join(" "));
    }

    // manipulate key
    keys.map(({}, index, array) => {
      array[index] === "summer_items" && array.splice(index, 1, "summer-items");
    });
    if (links) {
      category = keys.find(string => string === links[0]);
    }
  });

  // No data found
  data.length === 0 && descriptions.push("no items found");

  const onSelect = e => {
    e.target.tagName === "IMG"
      ? (pick = e.target.parentElement.firstChild.textContent)
      : (pick = e.target.textContent);
    let path;

    resetSearchBar();
    setInput("");
    if (e.target.tagName === "P") {
      path = e.target.innerText.split(" ");

      // Get category data
      getData(path[path.length - 1], path[0]);
    } else {
      let description = e.target.innerText;
      let objId, collectionIndex;
      let collection, categories, keys;

      initialData.map(arr => {
        arr.map(obj => {
          collection = Object.values(obj)[1];
          keys = Object.keys(obj).slice(2);
          categories = Object.values(obj).slice(2, Object.values(obj).length - 1);

          categories.map((array, index) => {
            typeof array === "object" &&
              array.map(obj => {
                description === obj.description && (objId = obj.id) && (collectionIndex = index);
              });
          });
        });
      });
    }

    // Modify string to match with list in database
    if (pick === "Summer Collection") {
      pick = "summer_items in " + pick;
    }

    pick === "summer_items in Summer Collection"
      ? (choice = summerList.find(description => (choice = description === pick.toLowerCase())))
      : (choice = descriptions.find(description => description === pick.toLowerCase()));

    links = choice.split(" ");

    // Manipulate string
    if (pick === "summer_items in Summer Collection") {
      choice = links[0].split("_");
      links[0] = choice.join("-");
    } else {
      links = choice.split(" ");
      choice = links.join("-");
    }

    disableDesktopSearchBar();

    if (category) {
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

  allItems = (
    <nav className="dataResult__menu">
      <div
        className="dataResult__option"
        onMouseEnter={() => {
          setActiveMenu(prevState => ({...prevState, active1: true}));
        }}
        onMouseLeave={() => {
          setActiveMenu(prevState => ({...prevState, active1: false}));
        }}
      >
        <h3 className={activeMenu.active1 ? "dataResult__title-active" : "dataResult__title"}>
          Clothing
        </h3>
        <ul className={activeMenu.active1 ? "dataResult__list" : "dataResult__list-no-show"}>
          <List
            onMouseEnter={() => {
              setActiveMenu(prevState => ({...prevState, activeLink: true}));
            }}
            onMouseLeave={() => {
              setActiveMenu(prevState => ({...prevState, activeLink: false}));
            }}
            menu={clothingList}
            initialData={initialData}
          />
        </ul>
      </div>

      <div
        className="dataResult__option"
        onMouseEnter={() => {
          setActiveMenu(prevState => ({...prevState, active2: true}));
        }}
        onMouseLeave={() => {
          setActiveMenu(prevState => ({...prevState, active2: false}));
        }}
      >
        <h3 className={activeMenu.active2 ? "dataResult__title-active" : "dataResult__title"}>
          Accessories
        </h3>
        <ul className={activeMenu.active2 ? "dataResult__list" : "dataResult__list-no-show"}>
          <List
            onMouseEnter={() => {
              setActiveMenu(prevState => ({...prevState, activeLink: true}));
            }}
            onMouseLeave={() => {
              setActiveMenu(prevState => ({...prevState, activeLink: false}));
            }}
            menu={accList}
            initialData={initialData}
          />
        </ul>
      </div>
      <div className="dataResult__option" onClick={onSelect}>
        <h3 className="dataResult__title">Summer Collection</h3>
      </div>
    </nav>
  );

  typeOfItems = descriptions.map((description, index) => (
    <li className="dataResult__link" onClick={onSelect} key={index}>
      {description}
    </li>
  ));

  noItems = descriptions.map((description, index) => (
    <li className="dataResult__link" onClick={onSelect} key={index}>
      {description}
    </li>
  ));

  individualItem = data.map((item, index) => (
    <div className="dataResult__container" key={index} onClick={onSelect}>
      <div className="dataResult__desc-container">
        <p className="dataResult__desc">{item.description}</p>
      </div>
      <img src={item.img} alt="item" className="dataResult__img" />
    </div>
  ));

  return (
    <Fragment>
      {descriptions.length === 0 && allItems}
      {category && typeOfItems}
      {descriptions[0] === "no items found" && noItems}
      {!category && descriptions[0] !== "no items found" && individualItem}
    </Fragment>
  );
};

export default ShowData;
