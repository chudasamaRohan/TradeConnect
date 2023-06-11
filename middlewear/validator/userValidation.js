const { check, validationResult } = require("express-validator");
const db = require("../../models/index")
const users = db.users

exports.changePassValidation = [
    check('currentPassword').trim().not().isEmpty().isLength({ min: 6, max: 10 }).withMessage('enter valid password'),
    check('newPassword').trim().not().isEmpty().isLength({ min: 6, max: 10 }).withMessage('enter valid password')
]


exports.loginValidation = [
    check('email').trim().not().isEmpty().normalizeEmail().isEmail().withMessage('Invalid Email.'),
    check('password').trim().not().isEmpty().isLength({ min: 6, max: 10 }).withMessage('enter valid password')
]

exports.userRegValidator = [
    check('firstName').trim().not().isEmpty().isLength({ min: 3, max: 15 }).withMessage("firstName must be 3 to 15 characters!"),
    check('lastName').trim().not().isEmpty().isLength({ min: 3, max: 15 }).withMessage("lastName must be 3 to 15 characters!"),
    check('email').normalizeEmail().isEmail().withMessage('Invalid Email!').custom(async (value) => {
        const user = await users.findOne({
            where: {
                email: value
            }
        });
        if (user) {
            throw new Error('Email already exists!');
        }
        return true;
    }),
    check('password').trim().not().isEmpty().isLength({ min: 6, max: 10 }).withMessage('Password must be 6 to 10 characters.'),
    check('mobileNo').trim().not().isEmpty().isLength(10).withMessage('Please enter a 10-digit contact number.').custom(async (value) => {
        const user = await users.findOne({
            where: {
                mobileNo: value
            }
        });
        if (user) {
            throw new Error('Mobile number already exists!');
        }
        return true;
    })
];

exports.validatorResult = async (req, res, next) => {
    const result = validationResult(req).array()
    if (!result.length) return next()
    const error = result[0].msg
    res.json({ suceess: false, messege: error })
}





