const db = require("../../models/index")
const products = db.Products
const userAdresss = db.userAddress
const { Op } = require("sequelize")

const checkOrder = async (req, res, next) => {
    const orderId = req.body.orderId
    const order = await db.orders.findOne({
        where: {
            id: orderId
        }
    })
    if (order && order.id) {
        req.orderData = order
        next()
    }
}

const IsInProduct = async (req, res, next) => {
    try {
        const product = await products.findOne({
            where: {
                id: req.body.productId,
                quantity: {
                    [Op.gt]: req.body.quantity,
                },
            },
        });
        if (product && product.id) {
            req.productData = product
            next();
        } else {
            res.status(400).json({ error: 'Quantity is not greater than the specified value.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};



const IsInAdresss = async (req, res, next) => {
    const adresss = await userAdresss.findOne({ where: { userId: req.id } })
    if (adresss && adresss.id) {
        req.address = adresss
        next()
    } else {
        res.status(404).send("plz enter your address.")
    }
}

module.exports = { IsInAdresss, IsInProduct, checkOrder }