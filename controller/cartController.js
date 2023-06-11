const db = require("../models/index")
const productCarts = db.productCarts


const addToCart = async (req, res) => {
    try {
        const userId = req.id
        const productId = req.body.productId
        const cart = await productCarts.create({ userId, productId })
        if (cart && cart.id) {
            res.status(200).json({ msg: "product add in cart." })
        } else {
            res.status(400).json({ msg: "bed request." })
        }
    } catch (error) {
        res.json({ error: error })
    }
}

const deleteCart = async (req, res) => {
    try {
        const productId = req.body.productId
        const cart = await productCarts.destroy({
            where: {
                userId: req.id, productId: productId
            }
        })
        if (cart == 1) {
            res.status(200).json({ msg: "deleted suceesfully." })
        }
    } catch (error) {
        res.json({ error: error })
    }



}
module.exports = { addToCart, deleteCart }