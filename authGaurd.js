const jwt = require("jsonwebtoken")

const authgaurd = async (req, res, next) => {
    try {

        let token = req.headers["x-access-token"];
        if (!token) {
            return res.status(403).send({
                message: "No token provided!"
            });
        }
        jwt.verify(token, process.env.SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).send({
                    message: "Unauthorized!"
                });
            }
            req.id = decoded.id
            req.email = decoded.email
            req.role = decoded.role
            req.designation = decoded.designation
            next();
        });
    } catch (error) {
        res.send(error)
    }
}

module.exports = { authgaurd }