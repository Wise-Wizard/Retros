const express = require("express");
const { addOrderItem, getOrderById } = require("../Controller/orderController");
const { protectHandler } = require("../Middleware/authMiddleware");

//Router Call
const router = express.Router();
router.route("/").post(protectHandler, addOrderItem);
//Get order by ID
router.route("/:id").get(protectHandler, getOrderById);
module.exports = router;
