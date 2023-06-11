const express = require("express")
const { authgaurd } = require("../authGaurd")
const router = express.Router()

const { createOrder } = require("../controller/orderController")
const { IsInAdresss, IsInProduct, checkOrder } = require("../middlewear/validator/orderValidation")
const { payment } = require("../controller/paymentController")


router.post("/create-order", authgaurd, IsInAdresss, IsInProduct, createOrder)
// router.post("/payment", authgaurd, checkOrder, payment)

module.exports = router