export const filterOutput = (output, data) => {
  let uniq = [];
  let splittedOutput;
  let keysArrays = [];

  output.forEach(array => {
    Array.isArray(array) &&
      Array.isArray(data) &&
      array.length === data.length &&
      array.every((val, index) => {
        if (val === data[index]) return array;
      });
  });

  data.forEach(arr => {
    arr && keysArrays.push(Object.keys(arr));
  });

  uniq = [...new Set(output)];

  if (typeof uniq === "object") return uniq;
  else {
    uniq.forEach(item => {
      typeof item === "string"
        ? (splittedOutput = item.toLowerCase().split(" "))
        : (splittedOutput = item.description.toLowerCase().split(" "));
    });

    keysArrays.forEach(keys => {
      keys.map(key => {
        if (key === splittedOutput[0]) {
          uniq = uniq.slice(-1);
        }
      });
    });

    return uniq;
  }
};
