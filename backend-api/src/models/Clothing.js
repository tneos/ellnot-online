const mongoose = require("mongoose");
const {Schema} = mongoose;

const ClothingSchema = new Schema({
  category: {
    type: String,
    required: true,
  },
  collectionId: Number,
  jeans: Array,
  tops: Array,
  dresses: Array,
  lingerie: Array,
  skirts: Array,
  shorts: Array,
  cardigans: Array,
  sales: Array,
});

module.exports = mongoose.model("Clothing", ClothingSchema, "clothing");
