import {
  SET_SEARCH_BAR,
  RESET_SEARCH_BAR,
  SET_INPUT,
  ADD_ITEM,
  DELETE_LIKED,
  DELETE_ERROR,
  SET_LIKED,
  FIND_DATA,
  GET_ALL_DATA,
  GET_DATA,
  GET_ITEM,
  GET_UNDER_PRICE,
  DATA_ERROR,
  UPDATE_DATA,
  CLEAR_DATA,
} from "../types";

const itemReducer = (state, action) => {
  switch (action.type) {
    case SET_SEARCH_BAR:
      return {
        ...state,
        searchBar: true,
      };
    case RESET_SEARCH_BAR:
      return {
        ...state,
        searchBar: false,
      };
    case SET_INPUT:
      return {
        ...state,
        input: action.payload,
      };
    case ADD_ITEM:
      return {
        ...state,
        favItems: action.payload,
      };

    case DELETE_LIKED:
      return {
        ...state,
        likedList: localStorage.setItem("liked", state.likedList.replace(action.payload, "")),
        // eslint-disable-next-line
        likedList: state.likedList.replace(action.payload, ""),
      };

    case DELETE_ERROR:
      return {
        ...state,
      };
    case SET_LIKED:
      return {
        ...state,
        likedList: state.likedList + action.payload,
      };
    case GET_ALL_DATA:
      return {
        ...state,
        dataSearch: action.payload,
        initialData: action.payload,
      };
    case GET_DATA:
    case GET_ITEM:
    case GET_UNDER_PRICE:
      return {
        ...state,
        appData: action.payload,
      };
    case DATA_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case FIND_DATA:
      return {
        ...state,
        dataSearch: state.dataSearch.concat(action.payload).slice(state.dataSearch.length),
      };
    case UPDATE_DATA:
      return {
        ...state,
        dataSearch: state.dataSearch.slice(action.payload),
      };
    case CLEAR_DATA:
      return {
        ...state,
        dataSearch: state.initialData,
      };
    default:
      return state;
  }
};

export default itemReducer;
