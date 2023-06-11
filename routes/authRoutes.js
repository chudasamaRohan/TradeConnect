const express = require("express")
const router = express.Router()

const { userRegister, userLogin, updatePassword, getAllUser, getSingleuser, deleteUser, updateUser, blockUser, unBlockUser } = require("../controller/userctrl")
const { userRegValidator, validatorResult, loginValidation, changePassValidation } = require("../middlewear/validator/userValidation")
const { authgaurd } = require("../authGaurd")
const { checkAdmin } = require("../middlewear/validator/chekar")


router.post("/register", userRegValidator, validatorResult, userRegister)
router.post("/login", loginValidation, validatorResult, userLogin)
router.post("/update-password", authgaurd, changePassValidation, validatorResult, updatePassword)
router.get("/all-user", authgaurd, checkAdmin, getAllUser)
router.get("/get-singleuser/:id", authgaurd, checkAdmin, getSingleuser)
router.delete("/delete-user/:id", authgaurd, checkAdmin, deleteUser)
router.put("/update-user", authgaurd, updateUser)
router.put("/block-user/:id", authgaurd, checkAdmin, blockUser)
router.put("/unBlock-user/:id", authgaurd, checkAdmin, unBlockUser)


module.exports = router

