const asyncHandler = require("express-async-handler");
const Product = require("../Models/productModel");

//Gets all products in Database
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

//Gets single product details from Database
const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product NOt Found!" });
  }
});

module.exports = { getProducts, getProduct };
