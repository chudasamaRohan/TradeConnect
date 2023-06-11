const { updateAddress } = require("../../controller/addressctrl")
const db = require("../../models/index")
const users = db.users
const products = db.Products

const checkAddress = async (req, res, next) => {
    const userId = req.id
    const up = await db.userAddress.findOne({
        where: {
            userId: userId
        }
    })
    if (up && up.id) {
        const data = await updateAddress(req, res)
    } else {
        next()
    }
}


const checkAdmin = async (req, res, next) => {
    const userID = req.id
    const admin = await users.findOne({
        where:
            { id: userID, role: "admin" }
    })
    if (admin && admin.id) {
        next()
    } else {
        res.status(400).send("only admin can acces for this api.")
    }
}

const IsProduct = async (req, res, next) => {
    const productId = req.body.productId

    const pro = await products.findOne({ where: { id: productId } })
    if (pro && pro.id) {
        req.productData = pro
        next()
    } else {
        res.status(404).json({ msg: "product is not available. " })
    }
}


module.exports = { checkAdmin, IsProduct, checkAddress }