const db = require("../models/index")
const users = db.users
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require('dotenv').config

const blockUser = async (req, res) => {
    try {
        const user = await users.update({ isBlocked: true }, { where: { id: req.params.id } })
        if (user == 1) {
            res.send("user bloked.")
        } else {
            res.status(404).send("user not found.")
        }
    } catch (error) {
        res.send(error)
    }

}
const unBlockUser = async (req, res) => {
    try {
        const user = await users.update({ isBlocked: false }, { where: { id: req.params.id } })
        if (user == 1) {
            res.send("user  unbloked.")
        } else {
            res.status(404).send("user not found.")
        }
    } catch (error) {
        res.send(error)
    }
}

const updateUser = async (req, res) => {
    const upUser = await users.update(
        {
            firstName: req?.body?.firstName,
            lastname: req?.body?.lastname,
            email: req?.body?.email,
            mobileNo: req?.body?.mobileNo
        }, {
        where: { id: req.id }
    })
    if (upUser == 1) {
        res.status(200).send('user detailes updated succesfuuly.')
    } else {
        res.status(404).send("user not found.")
    }
}



const deleteUser = async (req, res) => {
    try {
        const deleteRecord = await users.destroy({
            where: { id: req.params.id }
        })
        if (deleteRecord === 1) {
            res.status(200).json({ messege: "Deleted succesfully." })
        } else {
            res.status(404).json({ messege: "user not found." })
        }
    } catch (error) {
        res.status(500).json({ error: error })
    }
};





const getSingleuser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await users.findByPk(id);

        if (user) {
            res.status(200).send(user);
        } else {
            res.status(404).send("User not found.");
        }
    } catch (error) {
        res.send(error);
    }
};




const getAllUser = async (req, res) => {
    try {
        const data = await users.findAll()
        res.status(200).send(data)
    } catch (error) {
        res.send(error)
    }

}

const updatePassword = async (req, res) => {
    console.log("id", req.id);
    try {
        const { newPassword, currentPassword } = req.body
        const user = await users.findByPk(req.id)
        if (!user) {
            res.status(404).send("user not found.")
        } else if (user && user.id) {

            const password_valid = await bcrypt.compare(currentPassword, user.password)
            if (password_valid) {
                const hashedPassword = await bcrypt.hash(newPassword, 10);
                const updatedData = await users.update({
                    password: hashedPassword
                }, {
                    where: { id: user.id }
                })
                if (updatedData == 1) {
                    res.status(200).send("password update succesfully.")
                }
            } else {
                res.status(400).send("invalid currentpassword.")
            }
        }
    } catch (error) {
        res.send(error)
    }
}


const userLogin = async (req, res) => {
    const user = await users.findOne({ where: { email: req.body.email } });
    if (user) {
        const password_valid = await bcrypt.compare(req.body.password, user.password);
        if (password_valid) {
            token = jwt.sign({ "id": user.id, "email": user.email, "role": user.role }, process.env.SECRET);
            res.status(200).json({ token: token })
        } else {
            res.status(400).json({ error: "Password Incorrect" })
        }
    } else {
        res.status(404).json({ error: "email ID does not exits." })
    }
}

const userRegister = async (req, res) => {
    try {
        const user = await users.create(req.body)
        res.status(200).send(user)
    } catch (error) {
        res.status(500).send(error)
    }
}






module.exports = {
    userRegister,
    userLogin,
    updatePassword,
    getAllUser,
    getSingleuser,
    deleteUser,
    updateUser,
    blockUser,
    unBlockUser
}