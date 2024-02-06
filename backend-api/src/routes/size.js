const express = require("express");
const router = express.Router();

const User = require("../models/User");

// @route   PUT api/basket
// @desc    Change size of basket element
// @access  Private
router.put("/:id", async (req, res) => {
  const userId = req.params.id;

  const {item, size} = req.body;

  let updatedUser = {};

  try {
    // Update user
    updatedUser = await User.findOneAndUpdate(
      {
        _id: userId,
        basket: {
          $elemMatch: {
            0: {
              $eq: item,
            },
          },
        },
      },
      {
        $set: {
          "basket.$.1": size,
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
