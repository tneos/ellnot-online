const express = require("express");
const router = express.Router();

const User = require("../models/User");

// @route   PUT api/wishlist
// @desc    Add to wishlist
// @access  Private
router.put("/:id", async (req, res) => {
  const userId = req.params.id;

  let updatedUser = {};
  let [item] = req.body;

  try {
    // Update user
    updatedUser = await User.findOneAndUpdate(
      {_id: userId},
      {
        $push: {
          $sort: {field: -1},
          itemsLiked: item,
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
// @route   POST api/wishlist
// @desc    Delete item from wishlist
// @access  Private

router.post("/:id", async (req, res) => {
  const userId = req.params.id;
  const {item} = req.body;

  let updatedUser = {};

  try {
    // Update user
    updatedUser = await User.findOneAndUpdate(
      {_id: userId},
      {
        $pull: {
          itemsLiked: item,
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

// @route   DELETE api/wishlist
// @desc    Delete all liked items
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
          itemsLiked: "",
        },
      },
      {
        new: true,
      }
    );
    console.log(updatedUser);
    res.json({
      status: "success",
      updatedUser,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
