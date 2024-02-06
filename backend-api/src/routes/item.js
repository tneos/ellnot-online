const express = require("express");
const {where} = require("../models/Clothing");
const router = express.Router();

const Clothing = require("../models/Clothing");
const Shoes_Accessories = require("../models/Shoes_Accessories");
const Summer_Collection = require("../models/Summer_Collection");

// @route   GET api/clothing
// @desc    Get clothing data
// @access  Public
router.get("/:collection/:category/:id", async (req, res) => {
  let id = req.params.id;
  let collection = req.params.collection;
  let category = req.params.category;
  let item;
  console.log(collection);

  try {
    if (collection === "clothing") {
      // Get clothing data
      item = await Clothing.where(collection).where(category).select(category);
    } else if (collection === "shoes_accessories") {
      item = await Shoes_Accessories.where(collection).where(category).select(category);
    } else {
      item = await Summer_Collection.where(collection).where(category).select(category);
    }

    let result;
    const [obj] = item;

    // Get array of objects and return item with the same id
    result = Object.values(obj.toJSON())[1].filter(obj => obj.id == id);

    res.json({
      status: "success",
      result,
    });
  } catch (err) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
