const express = require("express");
const router = express.Router();
const {check, validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const User = require("../models/User");
const auth = require("../middleware/auth");

// Signup user
// @route   POST api/users
// @desc    Auth user & get token
// @access  Public
router.post(
  "/",
  [
    check("firstName", "Please add first name").not().isEmpty(),
    check("lastName", "Please add first name").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Please enter a password with 6 or more characters").isLength({min: 6}),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }

    const {title, firstName, lastName, email, password, day, year, month} = req.body;

    try {
      let user = await User.findOne({email});

      if (user) {
        return res.status(400).json({msg: "User already exists"});
      }
      user = new User({
        title,
        firstName,
        lastName,
        email,
        password,
        day,
        year,
        month,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      // Generate token
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 3600,
        },
        (err, token) => {
          if (err) throw err;
          res.json({token});
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route   UPDATE api/users
// @desc    Update user
// @access  Private
router.put("/", async (req, res) => {
  const {firstName, lastName, email, day, month, year} = req.body;

  // Build updated user
  let updatedUser = {};
  if (firstName) updatedUser.firstName = firstName;
  if (lastName) updatedUser.lastName = lastName;
  if (email) updatedUser.email = email;
  if (day) updatedUser.day = day;
  if (month) updatedUser.month = month;
  if (year) updatedUser.year = year;

  console.log(email, updatedUser);
  try {
    // Update user
    updatedUser = await User.findOneAndUpdate({email}, updatedUser, {
      new: true,
    });
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// @route   DELETE api/users
// @desc    Delete user
// @access  Private
router.delete("/", async (req, res) => {
  const {email} = req.body;

  try {
    await User.deleteOne({email});
    res.status(204);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
