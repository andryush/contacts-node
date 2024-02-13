const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// @desc sign up new user
// @route POST /users/sign-up
// @access public
const signUpUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const foundUser = await User.findOne({ email });

  if (foundUser) {
    res.status(400);
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      id: user.id,
      username: username.username,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Something went wrong!");
  }
});

// @desc sign in user
// @route /users/sign-in
// @access public
const signInUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const foundUser = await User.findOne({ email });

  if (foundUser && (await bcrypt.compare(password, foundUser.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          id: foundUser.id,
          username: foundUser.username,
          email: foundUser.email,
        },
      },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    res.status(200).json({
      userProfile: { username: foundUser.username, email: foundUser.email },
      token: { accessToken },
    });
  } else {
    res.status(401);
    throw new Error("Wrong email or password");
  }
});

// @desc current user info
// @route /users/me
// @access private
const me = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

module.exports = { signUpUser, signInUser, me };
