export const mapData = (initialData, search, input, find, clear, update) => {
  const data = [];
  const keys = [];
  const searchKeys = [];
  const filterArray = [];
  const category = [];
  const items = [];
  const types = [];
  const typesFound = [];
  let foundItems = [];
  let filter;
  let catIndex;
  let typeFound;

  search.forEach(el => {
    if (typeof el !== "string" && typeof el !== "object") {
      searchKeys.push(...Object.keys(el[0]).slice(2, Object.keys(el[0]).length - 1));
      searchKeys.forEach((val, i, arr) => {
        if (arr[i] === "summer_items") arr.splice(i, 1, "summer-items");
      });
    }
  });

  initialData.forEach(dataArray => {
    dataArray.forEach(obj => {
      data.push(...Object.values(obj).slice(2, Object.values(obj).length - 1));
      category.push(Object.values(obj)[1]);
      keys.push(...Object.keys(obj).slice(2, Object.keys(obj).length - 2));

      data.forEach(el => {
        if (typeof el === "object") {
          el.forEach(obj => {
            if (!items.includes(obj)) items.push(obj);
          });
        }

        keys.forEach(key => {
          if (!types.includes(key)) types.push(key);
        });

        if (input) {
          typeFound = keys.filter(item => item.toLowerCase().includes(input.toLowerCase()));

          if (typeof el === "object") {
            const found = el.filter(obj =>
              obj.description.toLowerCase().includes(input.toLowerCase()),
            );
            if (found.length > 0) foundItems = found;
          }
        }
      });
    });
  });

  if (typeFound && typeFound.length > 0) {
    initialData.forEach((dataArray, index) => {
      Object.keys(dataArray[0]).forEach(key => {
        typeFound.forEach(item => {
          if (item === key) catIndex = index;
        });
      });
    });

    typeFound.forEach((val, i, arr) => {
      if (arr[i] === "summer_items") arr.splice(i, 1, "summer-items");
    });

    typeFound.forEach(item => {
      if (input && item.includes(input.toLowerCase())) {
        filter = `${item} in ${category[catIndex]}`;
      }
    });

    if (typeof filter === "string") {
      typesFound.push(filter);
    }

    typesFound.forEach(type => {
      if (searchKeys.every(key => key !== type)) {
        find(type);
      }
    });
  } else if (typeFound && typeFound.length === 0) {
    foundItems.forEach(obj => {
      if (filterArray.length === 0 || !filterArray.includes(obj)) {
        filterArray.push(obj);
      }
    });

    update();
  } else {
    clear();
  }

  if (typesFound.length === 0) {
    find(filterArray);

    search.forEach((el, index) => {
      const substrings = typeof el === "string" ? el.split(" ") : el.description.split(" ");
      items.forEach(item => {
        if (item === substrings[0]) update(index + 1);
      });
    });
  }

  if (!input && foundItems.length === 0 && typesFound.length === 0) {
    clear();
  }

  if (input && foundItems.length === 0 && filterArray.length === 0) {
    find("No items found");
  }
};
