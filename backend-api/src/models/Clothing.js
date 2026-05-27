const mongoose = require("mongoose");
const {Schema} = mongoose;

const ClothingSchema = new Schema({
  category: {
    type: String,
    required: true,
  },
  collectionId: Number,
  jeans: [Object],
  tops: [Object],
  dresses: [Object],
  lingerie: [Object],
  skirts: [Object],
  shorts: [Object],
  cardigans: [Object],
  sales: [Object],
});

module.exports = mongoose.model("Clothing", ClothingSchema, "clothing");
