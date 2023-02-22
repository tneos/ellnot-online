import React, {Fragment, useContext} from "react";
import {Link} from "react-router-dom";

// Context
import SubMenuContext from "../context/subMenu/subMenuContext";
import ItemContext from "../context/items/itemContext";

function SubMenus() {
  const subMenuContext = useContext(SubMenuContext);
  const itemContext = useContext(ItemContext);

  const {active1, active2} = subMenuContext;
  const {getData} = itemContext;
  let screenWidth = window.innerWidth;

  // When submenus initially rendered all links deactivated
  let list1Collection = document.getElementsByClassName("sub-nav1__list");
  let list2Collection = document.getElementsByClassName("sub-nav2__list");

  let listArray1 = [...list1Collection];
  let listArray2 = [...list2Collection];
  let list1, list2;

  listArray1.map(list => {
    list1 = list;
  });
  listArray2.map(list => {
    list2 = list;
  });

  list1 &&
    list1.childNodes.forEach(element => {
      element.style.borderBottom = "0";
      element.firstChild.style.fontWeight = "200";
      element.firstChild.style.fontSize = "1.6rem";
    });
  list2 &&
    list2.childNodes.forEach(element => {
      element.style.borderBottom = "0";
      element.firstChild.style.fontWeight = "200";
      element.firstChild.style.fontSize = "1.6rem";
    });

  // Activate link
  const onActive = e => {
    if (e.target.className === "sub-nav1__link") {
      e.target.style.fontSize = "1.65rem";
      e.target.style.fontWeight = "600";
    }
  };

  // Deactivate link
  const onNonActive = e => {
    if (e.target.className === "sub-nav1__link") {
      e.target.style.fontSize = "1.6rem";
      e.target.style.fontWeight = "200";
    }
  };

  // Link clicked
  const onClick = e => {
    e.preventDefault();

    let list, id;
    console.log(e.target);

    // Check if list item or <a> element clicked
    e.target.id ? (id = e.target.id) : (id = e.target.firstChild.id);

    console.log(id);

    e.target.className === "sub-nav1__item"
      ? (list = e.target.parentNode)
      : (list = e.target.parentNode.parentNode);

    console.log(list);

    // Get all children of list and reset styling for all the rest
    list.childNodes.forEach(element => {
      element.style.borderBottom = "0";
      element.firstChild.style.fontWeight = "200";
      element.firstChild.style.fontSize = "1.6rem";
    });

    if (
      screenWidth < 800 &&
      (e.target.className === "sub-nav1__item" || e.target.className === "sub-nav2__item")
    ) {
      e.target.parentNode.parentNode.classList.remove("active");
    } else if (
      screenWidth < 800 &&
      (e.target.className === "sub-nav1__link" || e.target.className === "sub-nav2__link")
    ) {
      e.target.parentNode.parentNode.parentNode.classList.remove("active");
    } else if (
      screenWidth > 800 &&
      (e.target.className === "sub-nav1__item" || e.target.className === "sub-nav2__item")
    ) {
      console.log(e.target.firstChild);
      e.target.style.borderBottom = "3px solid #000";
      e.target.firstChild.style.fontWeight = "600";
      e.target.firstChild.style.fontSize = "1.65rem";
    } else {
      e.target.parentNode.style.borderBottom = "3px solid #000";
      e.target.style.fontWeight = "600";
      e.target.style.fontSize = "1.65rem";
    }

    if (!active1 || !active2) {
      e.target.style.borderBottom = "0";
      e.target.style.fontWeight = "200";
      e.target.style.fontSize = "1.6rem";
    }
  };

  return (
    <Fragment>
      <div className={active1 ? "sub-nav-1  active signup-active" : "sub-nav1 sub-signup"}>
        <ul className="sub-nav1__list">
          <li className="sub-nav1__item" onMouseOver={onActive} onClick={onClick}>
            <Link
              to="/clothing/jeans"
              className="sub-nav1__link"
              id="1"
              onMouseLeave={onNonActive}
            >
              Jeans
            </Link>
          </li>
          <li className="sub-nav1__item" onMouseOver={onActive} onClick={onClick}>
            <Link to="/clothing/tops" className="sub-nav1__link" id="2" onMouseLeave={onNonActive}>
              Tops
            </Link>
          </li>
          <li className="sub-nav1__item" onMouseOver={onActive} onClick={onClick}>
            <Link
              to="/clothing/dresses"
              className="sub-nav1__link"
              id="3"
              onMouseLeave={onNonActive}
            >
              Dresses
            </Link>
          </li>
          <li className="sub-nav1__item" onMouseOver={onActive} onClick={onClick}>
            <Link
              to="/clothing/lingerie"
              className="sub-nav1__link"
              id="4"
              onMouseLeave={onNonActive}
            >
              Lingerie
            </Link>
          </li>
          <li className="sub-nav1__item" onMouseOver={onActive} onClick={onClick}>
            <Link
              to="/clothing/skirts"
              className="sub-nav1__link"
              id="5"
              onMouseLeave={onNonActive}
            >
              Skirts
            </Link>
          </li>
          <li className="sub-nav1__item" onMouseOver={onActive} onClick={onClick}>
            <Link
              to="/clothing/shorts"
              className="sub-nav1__link"
              id="6"
              onMouseLeave={onNonActive}
            >
              Shorts
            </Link>
          </li>
          <li className="sub-nav1__item" onMouseOver={onActive} onClick={onClick}>
            <Link
              to="/clothing/cardigans"
              className="sub-nav1__link"
              id="7"
              onMouseLeave={onNonActive}
            >
              Cardigans
            </Link>
          </li>
          <li className="sub-nav1__item" onMouseOver={onActive} onClick={onClick}>
            <Link
              to="/clothing/sales"
              className="sub-nav1__link"
              id="8"
              onMouseLeave={onNonActive}
            >
              Deals
            </Link>
          </li>
        </ul>
      </div>

      <div className={active2 ? "sub-nav-2 active signup-active" : "sub-nav2 sub-signup"}>
        <ul className="sub-nav2__list">
          <li className="sub-nav2__item" onMouseOver={onActive} onClick={onClick}>
            <Link
              to="/shoes-accessories/accessories"
              className="sub-nav2__link"
              onMouseLeave={onNonActive}
            >
              Accessories
            </Link>
          </li>
          <li className="sub-nav2__item" onMouseOver={onActive} onClick={onClick}>
            <Link
              to="/shoes-accessories/boots"
              className="sub-nav2__link"
              onMouseLeave={onNonActive}
            >
              Boots
            </Link>
          </li>

          <li className="sub-nav2__item" onMouseOver={onActive} onClick={onClick}>
            <Link
              to="/shoes-accessories/heels"
              className="sub-nav2__link"
              onMouseLeave={onNonActive}
            >
              Heels
            </Link>
          </li>

          <li className="sub-nav2__item" onMouseOver={onActive} onClick={onClick}>
            <Link
              to="/shoes-accessories/hats"
              className="sub-nav2__link"
              onMouseLeave={onNonActive}
            >
              Hats
            </Link>
          </li>
          <li className="sub-nav2__item" onMouseOver={onActive} onClick={onClick}>
            <Link
              to="/shoes-accessories/handbags"
              className="sub-nav2__link"
              onMouseLeave={onNonActive}
            >
              Handbags
            </Link>
          </li>
          <li className="sub-nav2__item" onMouseOver={onActive} onClick={onClick}>
            <Link
              to="/shoes-accessories/belts"
              className="sub-nav2__link"
              onMouseLeave={onNonActive}
            >
              Belts
            </Link>
          </li>
          <li className="sub-nav2__item" onMouseOver={onActive} onClick={onClick}>
            <Link
              to="/shoes-accessories/candles"
              className="sub-nav2__link"
              onMouseLeave={onNonActive}
            >
              Candles
            </Link>
          </li>
          <li className="sub-nav2__item" onMouseOver={onActive} onClick={onClick}>
            <Link
              to="/shoes-accessories/sunglasses"
              className="sub-nav2__link"
              onMouseLeave={onNonActive}
            >
              Sunglasses
            </Link>
          </li>
        </ul>
      </div>
    </Fragment>
  );
}

export default SubMenus;
