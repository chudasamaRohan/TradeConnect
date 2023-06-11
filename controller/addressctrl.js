const db = require("../models/index")
const userAddress = db.userAddress

const addAddress = async (req, res) => {
    try {
        const userId = req.id
        const address = req.body.address
        const add = await userAddress.create({ userId, address })
        if (add && add.id) {
            res.send(add)
        }
    } catch (error) {
        res.send(error)
    }
}

const updateAddress = async (req, res) => {
    try {
        const address = req.body.address
        const userId = req.id
        const upData = await userAddress.update({ address: address }
            , {
                where: {
                    id: userId
                }
            })
        if (upData == 1) {
            res.status(200).send("address updated succesfully.")
        }
    } catch (error) {
        res.send(error)
    }
}


module.exports = {
    addAddress,
    updateAddress
}