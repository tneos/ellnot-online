const express = require("express");
const router = express.Router();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const User = require("../models/User");

// @route   PUT api/checkout
// @desc    Save client details and make payment
// @access  Private
router.put("/:id", async (req, res) => {
  const userId = req.params.id;
  const {form, items, total} = req.body;
  let totalFixed = parseInt(total * 100);

  // Create checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    success_url:
      process.env.MODE === "development"
        ? "http://localhost:3000/payment_confirmation?session_id={CHECKOUT_SESSION_ID}"
        : "https://ellnot-shop.onrender.com/payment_confirmation?session_id={CHECKOUT_SESSION_ID}",
    cancel_url:
      process.env.MODE === "development"
        ? "http://localhost:3000"
        : "https://ellnot-client.onrender.com",
    client_reference_id: userId,
    line_items: [
      {
        name: "Latest purchase",
        currency: "gbp",
        amount: totalFixed,
        quantity: 1,
      },
    ],
  });

  // Build updated user
  let updatedUser = {};

  updatedUser.clientDetails = form;
  updatedUser.itemsBought = items;

  try {
    // Update user
    updatedUser = await User.findOneAndUpdate({_id: userId}, updatedUser, {
      new: true,
    });
    res.json({
      status: "success",
      session,
      totalFixed,
      updatedUser,
    });
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// @route   POST api/checkout/:id
// @desc    Make payment
// @access  Private
router.post("/:id", async (req, res) => {
  // Get current user
  const userId = req.params.id;
  const {items, total} = req.body;

  // Build updated user
  let updatedUser = {};

  updatedUser.itemsBought = items;

  try {
    // Update user
    updatedUser = await User.findOneAndUpdate({_id: userId}, updatedUser, {
      new: true,
    });

    // Session as a response
    res.status(200).json({
      status: "success",
      session,
      items,
    });
  } catch (err) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
