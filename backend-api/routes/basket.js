const express = require("express");
const router = express.Router();

const User = require("../models/User");

// @route   PUT api/basket
// @desc    Add to basket
// @access  Private
router.put("/:id", async (req, res) => {
  const userId = req.params.id;
  const basketItem = [];
  const [string, size] = req.body;

  // Add a size if there is one
  basketItem.push(string);
  size && basketItem.push(size);

  let updatedUser = {};

  try {
    // Update user
    updatedUser = await User.findOneAndUpdate(
      {_id: userId},
      {
        $push: {
          $sort: {field: -1},
          basket: basketItem,
        },
      },
      {
        new: true,
      }
    );
    res.json({
      status: "success",
      updatedUser,
    });
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// @route   POST api/basket
// @desc    Delete item from basket
// @access  Private

router.post("/:id", async (req, res) => {
  const userId = req.params.id;

  const {item} = req.body;
  console.log(item);

  let updatedUser = {};

  try {
    // Update user -- Condition when item has a size or not
    updatedUser = await User.findOneAndUpdate(
      {_id: userId},
      {
        $pull: {
          basket: item.includes("</div>,") ? item.split(",") : [item],
        },
      },
      {
        new: true,
      }
    );

    res.json({
      status: "success",
      updatedUser,
    });
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// @route   PATCH api/wishlist
// @desc    Delete all items from basket after successful payment
// @access  Private
router.patch("/:id", async (req, res) => {
  const userId = req.params.id;
  let updatedUser = {};

  try {
    // Update user
    updatedUser = await User.findOneAndUpdate(
      {_id: userId},
      {
        $unset: {
          basket: "",
        },
      },
      {
        new: true,
      }
    );

    res.json({
      status: "success",
      updatedUser,
    });
  } catch (err) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
