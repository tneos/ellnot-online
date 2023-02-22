const express = require("express");
const router = express.Router();

const Clothing = require("../models/Clothing");
const Shoes_Accessories = require("../models/Shoes_Accessories");
const Summer_Collection = require("../models/Summer_Collection");

// @route   GET api/
// @desc    Get all data
// @access  Public
router.get("/", async (req, res) => {
  try {
    // Get clothing data
    let clothingData = await Clothing.find({});
    let shoes_accessoriesData = await Shoes_Accessories.find({});
    let summer_collectionData = await Summer_Collection.find({});

    let data = [];
    data.push(clothingData, shoes_accessoriesData, summer_collectionData);

    res.json({
      status: "success",
      data,
    });
  } catch (err) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
