const db = require("../models/index")
const orders = db.orders

const createOrder = async (req, res) => {
    try {
        const userId = req.id
        const productId = req.body.productId
        const userAddressId = req.address.id
        const quantity = req.body.quantity
        const orderDate = new Date();
        const price = req.productData.price
        const delivaryDate = new Date(orderDate.getTime() + (3 * 24 * 60 * 60 * 1000));
        const shippingcharge = req.productData.shippingCharge
        const totalPayment = shippingcharge + (quantity * price)
        const data = { userId, productId, userAddressId, quantity, orderDate, delivaryDate, shippingcharge, totalPayment }
        const orderData = await orders.create(data)
        res.send(orderData)
    } catch (error) {
        res.send(error)
    }
}

module.exports = { createOrder }