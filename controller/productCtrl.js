const db = require("../models/index")
const Products = db.Products
const { Op } = require("sequelize");


const filterProduct = async (req, res) => {
    try {
        const product = await Products.findAll({
            where: {
                price: {
                    [Op.gte]: req?.body?.startPrice,
                    [Op.lte]: req?.body?.endPrice
                },
                brand: req?.body?.brand,
                category: req?.body?.category
            },
        });
        if (product.length == 0) {
            res.status(404).send("product not found.")
        } else {
            res.status(200).send(product)
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' })
    }
}


const productByCatogary = async (req, res) => {
    try {
        const catogary = req.body.category
        const product = await Products.findAll({
            where: { category: catogary }
        })
        if (!product.length == 0) {
            res.status(200).send(product)
        } else {
            res.status(404).json({ msg: "this catogry product not available." })
        }
    } catch (error) {
        res.send(error)
    }
}

const deleteProduct = async (req, res) => {
    try {
        const productId = req.body.productId
        const product = await Products.destroy({
            where:
                { id: productId }
        })
        if (product == 1) {
            res.status(200).json({ msg: "product delete succesfully." })
        } else {
            res.status(404).json({ msg: "product not found. " })
        }
    } catch (error) {
        res.send(error)
    }
}



const getAllProducts = async (req, res) => {
    try {
        const pro = await Products.findAll()
        if (!pro.length == 0) {
            res.status(200).send(pro)
        } else {
            res.status(404).json({ products: pro })
        }

    } catch (error) {
        res.send(error)
    }
}




const getProduct = async (req, res) => {
    try {
        const productId = req.body.productId
        const product = await Products.findOne({
            where:
                { id: productId }
        })
        if (product && product.id) {
            res.status(200).send(product)
        } else {
            res.status(404).json({ messge: "product is not available." })
        }
    } catch (error) {
        res.send(error)
    }
}




const updateProduct = async (req, res) => {
    try {
        const productId = req.body.productId;
        const updatedData = await Products.update(
            {
                title: req?.body?.title,
                slug: req?.body?.slug,
                description: req?.body?.description,
                price: req?.body?.price,
                category: req?.body?.category,
                brand: req?.body?.brand,
                quantity: req?.body?.quantity
            },
            {
                where: {
                    id: productId
                }
            }
        );
        if (updatedData[0] === 1) {
            res.status(200).json({ msg: "Product data updated successfully." });
        } else {
            res.status(404).json({ msg: "Product not found." });
        }
    } catch (error) {
        res.send(error);
    }
};






const createProduct = async (req, res) => {
    req.body.createdBy = req.id
    try {
        const prod = await Products.create(req.body)
        if (prod && prod.id) {
            res.status(200).send(prod)
        }
    } catch (error) {
        res.send(error)
    }
}

module.exports = {
    createProduct,
    updateProduct,
    getProduct,
    getAllProducts,
    deleteProduct,
    productByCatogary,
    filterProduct
}