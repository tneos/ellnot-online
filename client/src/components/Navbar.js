import React, {useContext, Fragment, useState} from "react";
import {Link, Outlet, useNavigate} from "react-router-dom";
import {mapData} from "../utils/mapData";
import {filterOutput} from "../utils/filterOutput";

import ShowData from "./ShowData";

import SubMenuContext from "../context/subMenu/subMenuContext";
import AuthContext from "../context/auth/authContext";
import ItemContext from "../context/items/itemContext";

function Navbar() {
  const subMenuContext = useContext(SubMenuContext);
  const authContext = useContext(AuthContext);
  const itemContext = useContext(ItemContext);

  const navigate = useNavigate();

  // Component state
  const [logoutButton, setLogoutButton] = useState(false);
  const [deleteIcon, setDeleteIcon] = useState(false);

  const [highlightedMenu, setHighlightedMenu] = useState({
    menu1: false,
    menu2: false,
    menu3: false,
  });

  // Initialise context
  const {
    desktopSearchBar,
    mobileSearchBar,
    toggleSub1,
    toggleSub2,
    toggleSub3,
    enableDesktopSearchBar,
    disableDesktopSearchBar,
    enableMobileSearchBar,
    disableMobileSearchBar,
    deactivateAll,
  } = subMenuContext;
  const {token, logout, user, favItems, basketItems, isAuthenticated} = authContext;
  const {
    searchBar,
    input,
    dataSearch,
    appData,
    initialData,
    setSearchBar,
    resetSearchBar,
    setInput,
    findData,
    updateData,
    clearData,
  } = itemContext;

  // Variables and DOM elements
  let favContainer = document.createElement("div");
  let basketContainer = document.createElement("div");
  favContainer.insertAdjacentHTML("afterbegin", favItems);
  basketContainer.insertAdjacentHTML("afterbegin", basketItems);
  const favArray = [...favContainer.children];
  const basketArray = [...basketContainer.children];

  const activeSubMenu1 = () => {
    toggleSub1();
    setHighlightedMenu({
      menu1: !highlightedMenu.menu1,
    });
  };
  const activeSubMenu2 = () => {
    toggleSub2();
    setHighlightedMenu({
      menu2: !highlightedMenu.menu2,
    });
  };
  const activeSubMenu3 = () => {
    toggleSub3();
    setHighlightedMenu({
      menu3: !highlightedMenu.menu3,
    });
  };

  // Increase length of search bar and deactivate sub menus
  const onSearch = () => {
    setSearchBar();
    deactivateAll();
    setHighlightedMenu({
      menu1: false,
      menu2: false,
      menu3: false,
    });
    enableDesktopSearchBar();
  };

  // Activate mobile search bar
  const activeMobileSearchBar = () => {
    enableMobileSearchBar();
    setDeleteIcon(true);
  };

  // Deactivate mobile search bar
  const nonActiveMobileSearchBar = () => {
    disableMobileSearchBar();
    clearData();
    setInput("");
  };

  const onDeactivate = () => {
    disableDesktopSearchBar();
    resetSearchBar();
    deactivateAll();
    setInput("");
    clearData();
    setHighlightedMenu({
      menu1: false,
      menu2: false,
      menu3: false,
    });
  };

  const onLogout = () => {
    logout();
    navigate("/");
  };

  const onMouseEnterHandler = e => setLogoutButton(true);

  const onMouseLeaveHandler = e => setLogoutButton(false);

  // Set length of search bar to initial size

  const turnOffSearch = e => {
    e.preventDefault();
    disableDesktopSearchBar();
    resetSearchBar();
    setInput("");
    clearData();
  };

  // Filter data based on search input
  const handleFilter = e => {
    setInput(e.target.value);
    input !== " " ? setDeleteIcon(true) : setDeleteIcon(false);
    console.log(dataSearch);
    mapData(initialData, dataSearch, e.target.value, findData, clearData, updateData);
  };

  // Output item or return a response if none found
  const searchbarOutput = () => {
    let filteredData;
    if (dataSearch.every(data => data !== "undefined")) {
      filteredData = filterOutput(dataSearch, [appData]);
    }

    return <ShowData data={filteredData} />;
  };

  // Empty input
  const onDeleteInput = () => {
    setDeleteIcon(false);
    setInput("");
  };

  const loggedIn = (
    <Fragment>
      <div
        className="myaccount"
        onMouseEnter={onMouseEnterHandler}
        onMouseLeave={onMouseLeaveHandler}
      >
        <img src="../img/avatar.png" alt="user icon" className="icons__icon" />
        <p href="#" className="loggedIn">
          {user && `Welcome ${user.firstName}`}
        </p>
        <div href="#" className={logoutButton ? "logout-list logout-list__active" : "logout-list"}>
          <div role="link" onClick={() => navigate("/mine")} className="logout-list__link">
            <li className="logout-list__item">My account</li>
          </div>
          <li className="logout-list__item">My orders</li>
          <div role="link" onClick={onLogout} className="logout-list__link">
            <li className="logout-list__item">Logout</li>
          </div>
        </div>
      </div>
    </Fragment>
  );

  const search = (
    <Fragment>
      <nav className={!mobileSearchBar ? "nav-bar" : "search-active"}>
        <div className="logo">
          <Link to="/" className="logo__title" onClick={onDeactivate}>
            Ellnot
          </Link>
        </div>
        <ul className={!searchBar ? "nav-list" : "not-show-larger-screen not-show-mobile"}>
          {highlightedMenu.menu1 ? (
            <li className="nav-list__item item--1 active-menu" onClick={activeSubMenu1}>
              CLOTHING
            </li>
          ) : (
            <li className="nav-list__item item--1" onClick={activeSubMenu1}>
              CLOTHING
            </li>
          )}
          {highlightedMenu.menu2 ? (
            <li className="nav-list__item item--2 active-menu" onClick={activeSubMenu2}>
              SHOES &amp; ACCESSORIES
            </li>
          ) : (
            <li className="nav-list__item item--2" onClick={activeSubMenu2}>
              SHOES &amp; ACCESSORIES
            </li>
          )}

          {highlightedMenu.menu3 ? (
            <Link to="/collection/summer-items" className="nav-list__item item--3 active-menu">
              <li onClick={activeSubMenu3}>SUMMER COLLECTION</li>
            </Link>
          ) : (
            <Link to="/collection/summer-items" className="nav-list__item item--3">
              <li onClick={activeSubMenu3}>SUMMER COLLECTION</li>
            </Link>
          )}
        </ul>

        <form className={!searchBar ? "search-bar not-show-mobile" : "active-bar not-show-mobile"}>
          <input
            type="text"
            name="search"
            className={!searchBar ? "search-bar__input" : "active-bar__input"}
            value={input}
            onClick={onSearch}
            onChange={handleFilter}
          />
          {!mobileSearchBar && searchBar && (
            <>
              <a type="submit" className="active-bar__button">
                <img src="../img/search.png" alt="search icon" className="active-bar__icon" />
              </a>
              <button className="active-bar__btn" onClick={turnOffSearch}>
                &nbsp;
              </button>
            </>
          )}
          {!mobileSearchBar && !searchBar && (
            <button type="button" className="search-bar__button">
              <img src="../img/search.png" alt="search icon" className="search-bar__icon" />
            </button>
          )}
        </form>

        <img
          src="../img/search.png"
          alt="search icon"
          className="search-bar__icon not-show-larger-screen"
          onClick={activeMobileSearchBar}
        ></img>

        {/* Mobile search bar */}
        <div className={!mobileSearchBar ? "background" : "background-active"}></div>

        <div className={!mobileSearchBar ? "search-bar__mobile" : "search-bar__mobile-active"}>
          <div className="search-bar__wrapper">
            <form action="" className="search-bar__mobile-form">
              <div className="search-bar__mobile-input-container">
                <img
                  src="../../img/back-button.png"
                  alt="back button"
                  className="search-bar__mobile-back-button"
                  onClick={nonActiveMobileSearchBar}
                />
                <input
                  type="text"
                  className="search-bar__mobile-input"
                  name="keyword"
                  value={input}
                  onChange={handleFilter}
                  autoFocus
                />
                <label htmlFor="keyword" className="search-bar__mobile-label">
                  Search Ellnot
                </label>
                {deleteIcon ? (
                  <button
                    type="button"
                    className="search-bar__mobile-icon-active"
                    onClick={onDeleteInput}
                  ></button>
                ) : (
                  <button type="button" className="search-bar__mobile-icon"></button>
                )}
              </div>
            </form>
          </div>
          {dataSearch && dataSearch.length !== 0 && deleteIcon && (
            <ul className="dataResult">{searchbarOutput()}</ul>
          )}
        </div>

        <div className="icons">
          {token ? (
            loggedIn
          ) : (
            <Link to="/myaccount" onClick={onDeactivate}>
              <img src="../img/avatar.png" alt="user icon" className="icons__icon" />
            </Link>
          )}

          <Link to="/basket" onClick={onDeactivate}>
            <figure className="icons__figure">
              {!isAuthenticated ? (
                <img
                  src="../img/shopping-cart.png"
                  alt="shopping-cart icon"
                  className="icons__icon"
                />
              ) : (
                <>
                  <img
                    src="../img/shopping-cart.png"
                    alt="shopping-cart icon"
                    className="icons__icon"
                  />
                  <figcaption
                    className={`icons__caption + ${basketArray.length === 0 ? "hidden" : ""}`}
                  >
                    {basketArray.length}
                  </figcaption>
                </>
              )}
            </figure>
          </Link>
          <Link to="/wishlist" onClick={onDeactivate}>
            <figure className="icons__figure">
              {!isAuthenticated ? (
                <img src="../img/heart.png" alt="heart icon" className="icons__icon" />
              ) : (
                <>
                  <img src="../img/heart.png" alt="heart icon" className="icons__icon" />
                  <figcaption
                    className={`icons__caption + ${favArray.length === 0 ? "hidden" : ""}`}
                  >
                    {favArray.length}
                  </figcaption>
                </>
              )}
            </figure>
          </Link>
        </div>
      </nav>
      <div className={!desktopSearchBar ? "background" : "background-active"}></div>
      <div
        className={
          !desktopSearchBar
            ? "search-bar__desktop not-show-mobile"
            : "search-bar__desktop-active not-show-mobile"
        }
      >
        <div className="dataResult not-show-mobile">{searchbarOutput()}</div>
      </div>
    </Fragment>
  );

  return (
    <Fragment>
      {search}
      <Outlet />
    </Fragment>
  );
}

export default Navbar;
