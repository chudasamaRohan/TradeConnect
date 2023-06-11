const { check, validationResult } = require("express-validator");
const db = require("../../models/index")
const Products = db.Products

exports.createProductValidation = [
    check('title').not().isEmpty().isLength({ min: 3 }).withMessage('enter valid title mimimum 3 character.'),
    check('slug').not().isEmpty().isLength({ min: 3 }).withMessage('enter valid slug.'),
    check('description').not().isEmpty().isLength({ min: 10 }).withMessage('mimimum 10 character.'),
    check('price').not().isEmpty().withMessage('price must be required.'),
    check('category').not().isEmpty().withMessage('catogary must be required.'),
    check('brand').not().isEmpty().withMessage("brand must be required."),
    check('quantity').not().isEmpty().withMessage("quantity must be required."),
]

exports.updateProductValidation = [
    check('productId').not().isEmpty().withMessage("plz enter productId").custom(async (value) => {
        const product = await Products.findOne({
            where: {
                id: value
            }
        });
        if (!product) {
            throw new Error('product does not exits.');
        }
        return true;
    })
]