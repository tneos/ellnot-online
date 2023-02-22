import {
  DEACTIVATE_SUB_MENUS,
  TOGGLE_SUB1,
  TOGGLE_SUB2,
  TOGGLE_SUB3,
  ENABLE_DESKTOP_SEARCH_BAR,
  DISABLE_DESKTOP_SEARCH_BAR,
  ENABLE_MOBILE_SEARCH_BAR,
  DISABLE_MOBILE_SEARCH_BAR,
} from "../types";

const subMenuReducer = (state, action) => {
  switch (action.type) {
    case TOGGLE_SUB1:
      return {
        ...state,
        active1: !state.active1,
        active2: false,
        active3: false,
      };
    case TOGGLE_SUB2:
      return {
        ...state,
        active2: !state.active2,
        active1: false,
        active3: false,
      };
    case TOGGLE_SUB3:
      return {
        ...state,
        active3: !state.active3,
        active1: false,
        active2: false,
      };
    case ENABLE_DESKTOP_SEARCH_BAR:
      return {
        ...state,
        desktopSearchBar: true,
      };
    case DISABLE_DESKTOP_SEARCH_BAR:
      return {
        ...state,
        desktopSearchBar: false,
      };
    case ENABLE_MOBILE_SEARCH_BAR:
      return {
        ...state,
        mobileSearchBar: true,
      };
    case DISABLE_MOBILE_SEARCH_BAR:
      return {
        ...state,
        mobileSearchBar: false,
      };

    case DEACTIVATE_SUB_MENUS:
      return {
        ...state,
        active1: false,
        active2: false,
        active3: false,
      };
    default:
      return state;
  }
};

export default subMenuReducer;
