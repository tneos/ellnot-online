const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  day: {
    type: Number,
    required: true,
  },
  month: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  clientDetails: {
    type: Object,
  },
  basket: {
    type: Array,
  },
  itemsBought: {
    type: Array,
  },
  itemsLiked: {
    type: Array,
  },
});

module.exports = mongoose.model("user", UserSchema);
