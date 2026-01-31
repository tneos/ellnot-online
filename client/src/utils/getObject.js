export const getObject = (data, description) => {
  let clothingCat = [];
  let shoesAccessoriesCat = [];
  let summerCollectionCat = [];

  let clothElement, shoesAccElement, summerElement, element, elDesc;

  let clothing, shoesAccessories, summerCollection;

  [clothing, shoesAccessories, summerCollection] = data;

  if (clothing && shoesAccessories && summerCollection) {
    //let category1 = Object.values(clothing[0])[1].toLowerCase();
    Object.values(clothing[0])
      .slice(2, Object.values(clothing[0]).length - 1)
      .map(array => clothingCat.push(array));
    //clothingKeys = Object.keys(clothing[0]).slice(2, Object.keys(clothing[0]).length - 1);

    // let category2 = Object.values(shoesAccessories[0])[1].toLowerCase();

    // console.log(category2);
    Object.values(shoesAccessories[0])
      .slice(2, Object.values(shoesAccessories[0]).length - 1)
      .map(array => shoesAccessoriesCat.push(array));
    // shoesAccessoriesKeys = Object.keys(shoesAccessories[0]).slice(
    //   2,
    //   Object.keys(shoesAccessories[0]).length - 1
    // );

    // category2 = category2.split("-");
    // category2 = category2.join("_");

    // let category3 = Object.values(summerCollection[0])[1].split(" ").join("_");
    //category3 = category3.join("_");
    Object.values(summerCollection[0])
      .slice(2, Object.values(summerCollection[0]).length - 1)
      .map(array => summerCollectionCat.push(array));
    // let summerCollectionKeys = Object.keys(summerCollection[0]).slice(
    //   2,
    //   Object.keys(summerCollection[0]).length - 1
    // );
  }

  // Find object that satisfies the condition
  clothElement =
    clothingCat &&
    clothingCat.find((array, index) => {
      typeof array === typeof "array" &&
        (elDesc = array.find(obj => obj.description.toLowerCase() === description));
      // if (elDesc) {
      //   console.log(elDesc, index);
      //   let clothIndex = index;
      // }

      return elDesc;
    });

  shoesAccElement =
    shoesAccessoriesCat &&
    shoesAccessoriesCat.find((array, index) => {
      typeof array === typeof "array" &&
        (elDesc = array.find(obj => obj.description.toLowerCase() === description));
      //let shoesAccIndex = index;
      return elDesc;
    });

  summerElement =
    summerCollectionCat &&
    summerCollectionCat.find((array, index) => {
      typeof array === typeof "array" &&
        (elDesc = array.find(obj => obj.description.toLowerCase() === description));
      //elDesc && (summerIndex = index);
      return elDesc;
    });

  // Find right element in that object
  clothElement =
    clothElement && clothElement.find(obj => obj.description.toLowerCase() === description);
  shoesAccElement =
    shoesAccElement && shoesAccElement.find(obj => obj.description.toLowerCase() === description);
  summerElement =
    summerElement && summerElement.find(obj => obj.description.toLowerCase() === description);

  typeof clothElement === "object" && (element = clothElement);
  typeof shoesAccElement === "object" && (element = shoesAccElement);
  typeof summerElement === "object" && (element = summerElement);

  return element;
};
