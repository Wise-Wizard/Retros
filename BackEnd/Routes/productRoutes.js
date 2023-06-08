const express = require("express");
const { getProducts, getProduct } = require("../Controller/productController");

//Router Call
const router = express.Router();

//Fetch All Products from MongoDB
router.route("/products").get(getProducts);

//Fetch Single Product using ID
router.route("/products/:id").get(getProduct);
module.exports = router;
