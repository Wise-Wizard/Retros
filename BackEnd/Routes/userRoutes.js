const express = require("express");
const {
  registerUser,
  authController,
  getUserProfile,
  updateUserProfile,
} = require("../Controller/usersController");
const { protectHandler } = require("../Middleware/authMiddleware");
//Router Call
const router = express.Router();

//Register User
router.route("/").post(registerUser);
//Post Email and Password
router.post("/login", authController);

//Fetches User Profile Data
router
  .route("/profile")
  .get(protectHandler, getUserProfile)
  .put(protectHandler, updateUserProfile);
module.exports = router;
