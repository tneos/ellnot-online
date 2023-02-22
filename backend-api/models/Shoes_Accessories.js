const mongoose = require("mongoose");

const Shoes_AccessoriesSchema = mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  collectionId: Number,
  accessories: [Object],
  boots: [Object],
  heels: [Object],
  hats: [Object],
  handbags: [Object],
  belts: [Object],
  candles: [Object],
  sunglasses: [Object],
});

module.exports = mongoose.model("Shoes_Accessories", Shoes_AccessoriesSchema, "shoes_accessories");
