const mongoose = require("mongoose");
const {Schema} = mongoose;

const Summer_CollectionSchema = new Schema({
  category: {
    type: String,
    required: true,
  },
  collectionId: Number,
  summer_items: [Object],
});

module.exports = mongoose.model("Summer_Collection", Summer_CollectionSchema, "summer_collection");
