export const formatDate = date => {
  var newDate = new Date();
  newDate.setTime(date * 1000);
  let dateString = newDate.toLocaleString().split(",");

  return dateString[0], dateString[1];
};
