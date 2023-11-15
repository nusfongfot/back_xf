const express = require("express");
const productController = require("../controllers/productController");
const router = express.Router();

router.get("/product/list", productController.getAllProduct);
router.get("/product/search", productController.searchProduct);
router.get("/product/single/:id", productController.getProductById);

router.post("/product/insert", productController.createProduct);
module.exports = router;
