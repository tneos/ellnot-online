export const filterOutput = (output, data) => {
  let uniq = [];
  let splittedOutput;
  let keysArrays = [];

  output.map(array => {
    Array.isArray(array) &&
      Array.isArray(data) &&
      array.length === data.length &&
      array.every((val, index) => {
        if (val === data[index]) return array;
      });
  });
  console.log(output, data);

  data.map(arr => {
    arr && keysArrays.push(Object.keys(arr));
  });

  uniq = [...new Set(output)];
  console.log(uniq);

  //if (typeof uniq === "object") return uniq;
  if (uniq.every(el => typeof el === "string")) return uniq;
  else {
    // uniq.map(item => {
    //   console.log(item);
    //   typeof item === "string"
    //     ? (splittedOutput = item.toLowerCase().split(" "))
    //     : (splittedOutput = item.description.toLowerCase().split(" "));
    // });

    //console.log(splittedOutput);

    keysArrays.map(keys => {
      keys.map(key => {
        if (key === splittedOutput[0]) {
          uniq = uniq.slice(-1);
        }
      });
    });

    return uniq;
  }
};
