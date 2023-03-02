export const mapData = (initialData, search, input, find, clear, update) => {
  let filter, filterString;
  let data = [];
  let keys = [];
  let searchKeys = [];
  let filterArray = [];
  let category = [];
  let items = [];
  let types = [];
  let typesFound = [];
  let foundItems = [];
  let sameItem;
  let found;
  let catIndex;
  let typeFound;

  //console.log(initialData, search, input);

  // Save category keys and manipulate array
  search.map(el => {
    // If all data in state
    if (typeof el !== "string" && typeof el !== "object") {
      searchKeys.push(...Object.keys(el[0]).slice(2, Object.keys(el[0]).length - 1));
      searchKeys.map(({}, index, array) => {
        array[index] === "summer_items" && array.splice(index, 1, "summer-items");
      });
    }
  });

  initialData.map(dataArray => {
    dataArray.forEach(obj => {
      data.push(...Object.values(obj).slice(2, Object.values(obj).length - 1));
      category.push(Object.values(obj)[1]);
      keys.push(...Object.keys(obj).slice(2, Object.keys(obj).length - 1));
      // console.log(data);

      data.map(el => {
        // Get all selections in one sigle array
        typeof el === "object" &&
          el.map(obj => {
            items.indexOf(obj) === -1 && items.push(obj);
          });

        // Get all types in one sigle array
        keys.map(key => {
          types.indexOf(key) === -1 && types.push(key);
        });

        if (input) {
          typeFound = keys.filter(item => item.toLowerCase().includes(input.toLowerCase()));
          //console.log(typeFound);
          typeof el === "object" &&
            (found = el.filter(obj =>
              obj.description.toLowerCase().includes(input.toLowerCase())
            ));
          //console.log(found);
          found.length > 0 && (foundItems = found);
        }
      });
    });
  });
  //console.log(typeFound.length, foundItems);
  // Find the items that match the input

  // If type of items found
  if (typeFound.length > 0) {
    // Find the category that matches the one found and save the index
    initialData.map((dataArray, index) => {
      Object.keys(dataArray[0]).map(key => {
        typeFound.map(item => item === key && (catIndex = index));
      });
    });

    typeFound.map(({}, index, array) => {
      array[index] === "summer_items" && array.splice(index, 1, "summer-items");
    });

    // Manipulate string
    typeFound.map(
      item => input && item.includes(input) && (filter = item + " in " + category[catIndex])
    );

    typeof filter === "string" && (filterString = filter);

    // Save all strings found
    typesFound.push(filterString);
    //console.log(typesFound);
    typesFound.map(type => {
      if (searchKeys.every(key => key !== type)) {
        find(type);
      }
    });

    // If individual items found
  } else if (typeFound.length === 0) {
    foundItems.map(obj => {
      // Add description of item if it doesn't exist
      filterArray.length === 0
        ? filterArray.push(obj)
        : filterArray.indexOf(obj) === -1 && filterArray.push(obj);

      //console.log(filterArray);

      sameItem = filterArray.indexOf(obj.description);
    });

    update();
  } else {
    clear();
  }

  if (typeof filterArray === "object" && typesFound.length === 0) {
    // Find matching objects
    find(filterArray);

    // Update state if there is an individual item
    search === "array" &&
      search.map((el, index) => {
        console.log(el);
        let substrings;
        el === "string" ? (substrings = el.split(" ")) : (substrings = el.description.split(" "));
        items.map(item => item === substrings[0] && update(index + 1));
      });
  }

  if (!input && foundItems.length === 0 && typesFound.length === 0) {
    clear();
  }
  if (input && foundItems.length === 0 && types.length === 0) {
    find("No items found");
  }
};
