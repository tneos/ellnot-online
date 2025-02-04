import {filterInput} from "./filterInput";

export const getDuplicates = array => {
  let allItems = [];
  let ids = [];
  let allItemsStrings, uniqueStringArray, uniqueArray;
  let countKeys = [];
  let countValues = [];
  let uniqueStrings = [];
  let uniqueDescriptions = [];
  let basketUnique = [];
  let optionsArray = [];
  let sizeValues = [];
  let uniqueSizes = [];
  let options = [];
  let optionsUnique = [];

  let uniqueContainer = document.createElement("div");

  // Array of size values
  array.forEach((el, index) => {
    array[index].lastChild.hasChildNodes() &&
      array[index].lastChild.firstChild.hasChildNodes() &&
      (optionsArray = [...array[index].lastChild.firstChild]);

    el.lastChild.hasChildNodes() &&
      el.lastChild.firstChild.hasChildNodes() &&
      (optionsArray[0].value = filterInput(el));
    el.lastChild.hasChildNodes() &&
      el.lastChild.firstChild.hasChildNodes() &&
      sizeValues.push(optionsArray[0].value);
    options.push(optionsArray);
  });

  // Save descriptions and sizes of basket items in array
  array.forEach(element => {
    if (element.lastChild.firstChild) {
      allItems.push([
        element.firstChild.nextSibling.nextSibling.firstChild.innerText,
        element.lastChild.firstChild.value,
      ]);
    } else {
      allItems.push([element.firstChild.nextSibling.nextSibling.firstChild.innerText]);
    }
  });

  // Check if array has duplicates and get unique array
  allItemsStrings = allItems.map(JSON.stringify);
  uniqueStringArray = new Set(allItemsStrings);
  uniqueArray = Array.from(uniqueStringArray, JSON.parse);
  uniqueArray.map(el => uniqueDescriptions.push(el[0]));

  // Count duplicates
  let count = {};
  allItems.forEach(i => {
    count[i] = (count[i] || 0) + 1;
  });

  // Manipulate duplicates object
  Object.keys(count).forEach(key => {
    countKeys.push(key.split(",")[0]);
  });

  Object.values(count).forEach(value => {
    countValues.push(value);
  });

  // Display unique values
  uniqueArray.forEach(item => {
    array.forEach((el, index, array) => {
      // Save ids in order to use them on the component
      array[index].getAttribute("id") && ids.push(array[index].getAttribute("id"));
      array[index].removeAttribute("id");

      if (
        (item[0] === el.firstChild.nextSibling.nextSibling.firstChild.innerText &&
          uniqueStrings.indexOf(array[index].outerHTML) === -1) ||
        uniqueStrings.length === 0
      ) {
        uniqueStrings.push(array[index].outerHTML);
      }
    });
  });

  // Array of unique DOM elements
  if (uniqueStrings) {
    uniqueContainer.insertAdjacentHTML("afterbegin", uniqueStrings);
    basketUnique = [...uniqueContainer.children];
  }

  // Array of unique size values
  basketUnique.forEach(el => {
    if (el.lastChild.hasChildNodes() && el.lastChild.firstChild.hasChildNodes()) {
      uniqueSizes = [...el.lastChild.firstChild];
      uniqueSizes[0].value = el.lastChild.firstChild.value;
    } else {
      uniqueSizes = [];
    }

    optionsUnique.push(uniqueSizes);
  });

  return {basketUnique, countValues, ids, options, optionsUnique};
};
