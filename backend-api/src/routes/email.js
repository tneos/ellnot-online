const express = require("express");
const router = express.Router();

const {check, validationResult} = require("express-validator");

const User = require("../models/User");

// Check email POST
// @route   POST api/users
// @desc    Check if email exists
// @access  Public
router.post("/", check("email", "Please include a valid email").isEmail(), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }

  const {email} = req.body;

  try {
    let user = await User.findOne({email});

    if (user) {
      return res.status(400).json({msg: "User already exists"});
    }

    res.json(req.body);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
