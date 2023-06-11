const express = require("express")
const { authgaurd } = require("../authGaurd")
const { checkAdmin, IsProduct, checkAddress } = require("../middlewear/validator/chekar")
const { createProduct, updateProduct, getProduct, getAllProducts, deleteProduct, productByCatogary, filterProduct } = require("../controller/productCtrl")
const router = express.Router()
const { createProductValidation, updateProductValidation } = require("../middlewear/validator/productValidation")
const { validatorResult } = require("../middlewear/validator/userValidation")
const { addToCart, deleteCart } = require("../controller/cartController")
const { addAddress, updateAddress } = require("../controller/addressctrl")

router.post("/create-product", authgaurd, checkAdmin, createProductValidation, validatorResult, createProduct)
router.put("/update-product", authgaurd, checkAdmin, updateProductValidation, validatorResult, updateProduct)
router.get("/getProduct", authgaurd, getProduct)
router.get("/getAllProduct", authgaurd, getAllProducts)
router.delete("/delete-product", authgaurd, checkAdmin, deleteProduct)
router.post("/productByCatogary", authgaurd, productByCatogary)
router.post("/filter-product", authgaurd, filterProduct)
router.post("/addToCart", authgaurd, IsProduct, addToCart)
router.delete("/deleteCart", authgaurd, deleteCart)
router.post("/addAddress", authgaurd, checkAddress, addAddress)
router.put("/updateAddress", authgaurd, updateAddress)




module.exports = router