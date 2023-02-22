import React, {useReducer} from "react";
import SubMenuContext from "./subMenuContext";
import subMenuReducer from "./subMenuReducer";
import {
  TOGGLE_SUB1,
  TOGGLE_SUB2,
  TOGGLE_SUB3,
  ENABLE_DESKTOP_SEARCH_BAR,
  DISABLE_DESKTOP_SEARCH_BAR,
  ENABLE_MOBILE_SEARCH_BAR,
  DISABLE_MOBILE_SEARCH_BAR,
  DEACTIVATE_SUB_MENUS,
} from "../types";

const SubMenuState = props => {
  const initialState = {
    active1: false,
    active2: false,
    active3: false,
    desktopSearchBar: false,
    mobileSearchBar: false,
  };

  const [state, dispatch] = useReducer(subMenuReducer, initialState);

  // Toggle sub menus
  const toggleSub1 = () => dispatch({type: TOGGLE_SUB1});
  const toggleSub2 = () => dispatch({type: TOGGLE_SUB2});
  const toggleSub3 = () => dispatch({type: TOGGLE_SUB3});

  // Enable desktop search bar
  const enableDesktopSearchBar = () => dispatch({type: ENABLE_DESKTOP_SEARCH_BAR});

  // Disable mobile search bar
  const disableDesktopSearchBar = () => dispatch({type: DISABLE_DESKTOP_SEARCH_BAR});

  // Enable mobile search bar
  const enableMobileSearchBar = () => dispatch({type: ENABLE_MOBILE_SEARCH_BAR});

  // Disable mobile search bar
  const disableMobileSearchBar = () => dispatch({type: DISABLE_MOBILE_SEARCH_BAR});

  const deactivateAll = () => dispatch({type: DEACTIVATE_SUB_MENUS});

  return (
    <SubMenuContext.Provider
      value={{
        active1: state.active1,
        active2: state.active2,
        active3: state.active3,
        mobileSearchBar: state.mobileSearchBar,
        desktopSearchBar: state.desktopSearchBar,
        toggleSub1,
        toggleSub2,
        toggleSub3,
        enableDesktopSearchBar,
        disableDesktopSearchBar,
        enableMobileSearchBar,
        disableMobileSearchBar,
        deactivateAll,
      }}
    >
      {props.children}
    </SubMenuContext.Provider>
  );
};

export default SubMenuState;
