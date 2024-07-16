const express = require("express");
const {db} = require("../models/Clothing");
const router = express.Router();

// @route   GET api/collection
// @desc    Get category data
// @access  Public
router.get("/:collection/:category", async (req, res) => {
  let category = req.params.category;
  let collection = req.params.collection;

  // Modify params to match database collections
  if (collection === "shoes-accessories") {
    collection = collection.split("-");
    collection = collection.join("_");
  } else if (collection === "collection" && category === "summer-items") {
    collection = "summer_collection";
    category = category.split("-");
    category = category.join("_");
  }

  try {
    // Get clothing data
    let catData = await db.collection(collection).distinct(category);

    res.json({
      status: "success",
      catData,
    });
  } catch (err) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
