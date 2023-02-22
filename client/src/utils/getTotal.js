export const getTotal = (storage, array) => {
  let total = 0.0;

  storage &&
    array.map(el => {
      total += parseFloat(el.children[2].children[1].innerText.slice(1));
      return total;
    });
  return total;
};
