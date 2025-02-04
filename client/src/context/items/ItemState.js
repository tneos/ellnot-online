import React, {useReducer} from "react";
import axios from "axios";

import ItemContext from "./itemContext";
import itemReducer from "./itemReducer";

import {
  GET_ALL_DATA,
  GET_DATA,
  GET_ITEM,
  GET_UNDER_PRICE,
  DATA_ERROR,
  SET_SEARCH_BAR,
  RESET_SEARCH_BAR,
  SET_INPUT,
  DELETE_LIKED,
  SET_LIKED,
  FIND_DATA,
  UPDATE_DATA,
  CLEAR_DATA,
} from "../types";

const ItemState = props => {
  const initialState = {
    sizeOptions: [
      {
        topsLabel: "Select size",
        topsValue: "select_size",
        waistLabel: "Select size",
        waistValue: "select_size",
        shoesLabel: "Select size",
        shoesValue: "select_size",
      },
      {
        topsLabel: "Size XXS",
        topsValue: "xxs",
        waistLabel: "Size 6",
        waistValue: 6,
        shoesLabel: "Size 3",
        shoesValue: 3,
      },
      {
        topsLabel: "Size XS",
        topsValue: "xs",
        waistLabel: "Size 8",
        waistValue: 8,
        shoesLabel: "Size 4",
        shoesValue: 4,
      },
      {
        topsLabel: "Size S",
        topsValue: "s",
        waistLabel: "Size 10",
        waistValue: 10,
        shoesLabel: "Size 5",
        shoesValue: 5,
      },
      {
        topsLabel: "Size M",
        topsValue: "m",
        waistLabel: "Size 12",
        waistValue: 12,
        shoesLabel: "Size 6",
        shoesValue: 6,
      },
      {
        topsLabel: "Size L",
        topsValue: "l",
        waistLabel: "Size 14",
        waistValue: 14,
        shoesLabel: "Size 7",
        shoesValue: 7,
      },
      {
        topsLabel: "Size XL",
        topsValue: "xl",
        waistLabel: "Size 16",
        waistValue: 16,
        shoesLabel: "Size 8",
        shoesValue: 8,
      },
      {
        topsLabel: "Size XXL",
        topsValue: "xxl",
        waistLabel: "Size 18",
        waistValue: 18,
        shoesLabel: "Size 9",
        shoesValue: 9,
      },
    ],

    searchBar: false,
    input: "",
    dataSearch: [],
    initialData: [],
    appData: null,
    likedList: localStorage.getItem("liked"),
    error: null,
  };

  const [state, dispatch] = useReducer(itemReducer, initialState);

  // Retrieve all data
  const getAllData = async () => {
    try {
      const res =
        process.env.REACT_APP_ENV === "development"
          ? await axios.get(`api/data`)
          : await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/data`);

      console.log(res.data);
      dispatch({
        type: GET_ALL_DATA,
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: DATA_ERROR,
        payload: err.response.data.msg,
      });
    }
  };

  // Retrieve data
  const getData = async (collection, category) => {
    try {
      const res =
        process.env.REACT_APP_ENV === "development"
          ? await axios.get(`/api/${collection}/${category}`)
          : await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/${collection}/${category}`);

      let dataArr = res.data.catData;
      console.log(res);

      dataArr.length > 0 &&
        dispatch({
          type: GET_DATA,
          payload: dataArr,
        });
    } catch (err) {
      dispatch({
        type: DATA_ERROR,
        payload: err.response.data.msg,
      });
    }
  };

  // Retrieve individual item
  const getIndvItem = async (collection, category, id) => {
    try {
      const res =
        process.env.REACT_APP_ENV !== "production"
          ? await axios.get(`/api/item/${collection}/${category}/${id}`)
          : await axios.get(
              `${process.env.REACT_APP_BACKEND_URL}/api/item/${collection}/${category}/${id}`
            );

      localStorage.setItem("item", JSON.stringify(res.data.result[0]));

      dispatch({
        type: GET_ITEM,
        payload: res.data.result[0],
      });
    } catch (err) {
      dispatch({
        type: DATA_ERROR,
        payload: err.response.data.msg,
      });
    }
  };

  // Get items under specific price
  const getUnderPrice = async price => {
    try {
      const res =
        process.env.REACT_APP_ENV !== "production"
          ? await axios.get(`/api/under/${price}`)
          : await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/under/${price}`);

      let results;
      let arrayOfObjects = [];

      res.data.found.forEach(obj => {
        results = Object.values(obj);
      });

      // Map results and if array with objects found map through and push objects to arrayOfObjects
      results.forEach(element => {
        if (typeof element === "object" && element.length > 0) {
          element.map(el => arrayOfObjects.push(el));
        } else if (typeof element === "object") {
          Object.values(element).map(
            array => array.length > 0 && array.map(obj => arrayOfObjects.push(obj))
          );
        }
      });

      dispatch({
        type: GET_UNDER_PRICE,
        payload: arrayOfObjects,
      });
    } catch (err) {
      dispatch({
        type: DATA_ERROR,
        payload: err.response.data.msg,
      });
    }
  };

  // Activate search bar
  const setSearchBar = data => {
    data && data.length > 0 && dispatch({type: SET_SEARCH_BAR});
  };

  // Deactivate search bar
  const resetSearchBar = () => dispatch({type: RESET_SEARCH_BAR});

  // Clear input
  const setInput = input => dispatch({type: SET_INPUT, payload: input});

  // Set liked
  const setLiked = item => dispatch({type: SET_LIKED, payload: item});

  // Delete liked item
  const deleteLiked = item => dispatch({type: DELETE_LIKED, payload: item});

  // Find data
  const findData = data => dispatch({type: FIND_DATA, payload: data});

  // Update data
  const updateData = index => dispatch({type: UPDATE_DATA, payload: index});

  // Delete data
  const clearData = () => dispatch({type: CLEAR_DATA});

  return (
    <ItemContext.Provider
      value={{
        sizeOptions: state.sizeOptions,
        searchBar: state.searchBar,
        input: state.input,
        dataSearch: state.dataSearch,
        initialData: state.initialData,
        appData: state.appData,
        likedList: state.likedList,
        error: state.error,
        setSearchBar,
        resetSearchBar,
        setInput,
        setLiked,
        deleteLiked,
        getAllData,
        getData,
        getIndvItem,
        getUnderPrice,
        findData,
        updateData,
        clearData,
      }}
    >
      {props.children}
    </ItemContext.Provider>
  );
};

export default ItemState;
