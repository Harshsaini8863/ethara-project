const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.json({
        message: "Email already exists"
      });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashed,
      role
    });

    await user.save();

    res.json({
      message: "Registration Successful"
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Register Error"
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({
        message: "User not found"
      });
    }

    const match = await bcrypt.compare(
      password,
      user.password
    );

    if (!match) {
      return res.json({
        message: "Wrong password"
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      process.env.JWT_SECRET
    );

    res.json({
      token,
      user
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Login Error"
    });
  }
});

module.exports = router;