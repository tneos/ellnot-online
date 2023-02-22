export const filterInput = el => {
  let optionsArray = [];
  let size;

  el.children[3].firstChild && (optionsArray = el.children[3].firstChild);

  // Format values
  if (
    optionsArray.length > 0 &&
    el.nextSibling &&
    el.nextSibling.data &&
    el.nextSibling.data.charAt(0) === "," &&
    el.nextSibling.data.charAt(el.nextSibling.length - 1) === ","
  ) {
    optionsArray.length > 0 && (optionsArray[0].value = el.nextSibling.data.slice(1, -1));
  } else if (
    optionsArray.length > 0 &&
    el.nextSibling &&
    el.nextSibling.data &&
    el.nextSibling.data.charAt(0) === ","
  ) {
    optionsArray.length > 0 && (optionsArray[0].value = el.nextSibling.data.slice(1));
  } else if (
    optionsArray.length > 0 &&
    el.nextSibling &&
    el.nextSibling.data &&
    el.nextSibling.data.charAt(el.nextSibling.length - 1) === ","
  ) {
    optionsArray.length > 0 && (optionsArray[0].value = el.nextSibling.data.slice(0, -1));
  } else if (
    optionsArray.length > 0 &&
    el.nextSibling &&
    el.nextSibling.data &&
    el.nextSibling.data.charAt(0) === "," &&
    el.nextSibling.data.charAt(el.nextSibling.length - 4) === "n"
  ) {
    optionsArray.length > 0 && (optionsArray[0].value = el.nextSibling.data.slice(0, -4));
  }

  optionsArray.length > 0 && (size = optionsArray[0].value);
  return size;
};
