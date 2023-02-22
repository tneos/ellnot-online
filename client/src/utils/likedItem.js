export const likedItem = (likedArray, item) =>
  // Remove host's name from string and find items with matching id and src
  likedArray.find(el =>
    process.env.REACT_APP_ENV !== "production"
      ? item.id === parseInt(el.className.slice(-1)) &&
        ".." + el.firstChild.src.slice(21) === item.img
      : item.id === parseInt(el.className.slice(-1)) &&
        ".." + el.firstChild.src.slice(34) === item.img
  );
