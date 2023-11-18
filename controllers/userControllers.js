const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//@desc Register all users
//@route Post /api/users/register
// @access public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory !");
  }
  const userPresent = await User.findOne({ email });
  if (userPresent) {
    res.status(400);
    throw new Error("Email Id already registered! Use different Email.");
  }
  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Hashed Password : ", hashedPassword);
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });
  console.log("User is : ", user);
  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error("User data is not valid !");
  }
  // await User.
  res.json({ message: "Register the user" });
});
//@desc login user
//@route Post /api/users/login
// @access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields mandatory!");
  }
  const user = await User.findOne({ email });
  //compare password with hashed password
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      {expiresIn : "15m"}
    );
    res.status(200).json({accessToken})
  }else{
    res.status(401)
    throw new Error("email or password is not valid!")
  }
});
//@desc current user
//@route Post /api/users/current
// @access private
const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = {
  registerUser,
  loginUser,
  currentUser,
};
