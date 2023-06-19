const asyncHandler = require("express-async-handler");
const User = require("../Models/userModel");
const generateToken = require("../Utility/generateToken");
const jwt = require("../Utility/generateToken");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(401);
    throw new Error("User already exists!");
  }
  const currentUser = await User.create({ name, email, password });
  if (currentUser) {
    res.json({
      _id: currentUser._id,
      name: currentUser.name,
      email: currentUser.email,
      isAdmin: currentUser.isAdmin,
      token: generateToken(currentUser._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email and Password!");
  }
});

const authController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const currentUser = await User.findOne({ email });
  if (currentUser && (await currentUser.matchPassword(password))) {
    res.json({
      _id: currentUser._id,
      name: currentUser.name,
      email: currentUser.email,
      isAdmin: currentUser.isAdmin,
      token: generateToken(currentUser._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email");
  }
});

const getUserProfile = asyncHandler(async (req, res) => {
  const loggedInUser = await User.findById(req.user._id);
  if (loggedInUser) {
    res.json({
      _id: loggedInUser._id,
      name: loggedInUser.name,
      email: loggedInUser.email,
      isAdmin: loggedInUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not Found!");
  }
});

//Gets User's Favourites
const getFavourites = asyncHandler(async (req, res) => {
  const loggedinUser = await User.findById(req.user._id);
  if (loggedinUser) {
    res.json({
      _id: loggedinUser._id,
      favourites: loggedinUser.favProducts,
    });
  } else {
    res.status(404);
    throw new Error("No Favourites found!");
  }
});

//Updates User's Favourites
const addToFavorites = asyncHandler(async (req, res) => {
  console.log(req.params.id);
  const productId = req.params.id;
  const loggedinUser = await User.findById(req.user._id);

  if (loggedinUser) {
    // Check if the product is already in the favorites
    const isProductInFavorites = loggedinUser.favProducts.some(
      (product) => product.toString() === productId
    );

    if (isProductInFavorites) {
      res.status(400);
      throw new Error("Product already in favorites");
    }

    // Add the new product to the favorites list
    loggedinUser.favProducts.push(productId);
    await loggedinUser.save();

    res.status(201).json({
      message: "Product added to favorites",
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
const removeFavorite = asyncHandler(async (req, res) => {
  const productId = req.params.id;
  const loggedinUser = await User.findById(req.user._id);

  if (loggedinUser) {
    // Check if the product exists in the favorites
    const productIndex = loggedinUser.favProducts.findIndex(
      (product) => product.toString() === productId
    );

    if (productIndex === -1) {
      res.status(400);
      throw new Error("Product is not in favorites");
    }

    // Remove the product from the favorites list
    loggedinUser.favProducts.splice(productIndex, 1);
    await loggedinUser.save();

    res.status(200).json({
      message: "Product removed from favorites",
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//Updates User Profile
const updateUserProfile = asyncHandler(async (req, res) => {
  const currentUser = await User.findById(req.user._id);
  if (currentUser) {
    currentUser.name = req.body.name || currentUser.name;
    currentUser.email = req.body.email || currentUser.email;
    if (req.body.password) {
      currentUser.password = req.body.password;
    }
    const updateUser = await currentUser.save();
    res.json({
      _id: updateUser._id,
      name: updateUser.name,
      email: updateUser.email,
      isAdmin: updateUser.isAdmin,
      token: generateToken(updateUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});
module.exports = {
  registerUser,
  authController,
  getUserProfile,
  updateUserProfile,
  getFavourites,
  addToFavorites,
  removeFavorite
};
