const mongoose = require("mongoose");

const ClothingSchema = mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  collectionId: Number,
  jeans: {
    type: Array,
  },
  tops: {
    type: Array,
  },
  dresses: {
    type: Array,
  },
  lingerie: {
    type: Array,
  },
  skirts: {
    type: Array,
  },
  shorts: {
    type: Array,
  },
  cardigans: {
    type: Array,
  },
  sales: {
    type: Array,
  },
});

module.exports = mongoose.model("Clothing", ClothingSchema, "clothing");
