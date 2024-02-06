const mongoose = require("mongoose");

const Summer_CollectionSchema = mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  collectionId: Number,
  summer_items: [Object],
});

module.exports = mongoose.model("Summer_Collection", Summer_CollectionSchema, "summer_collection");
