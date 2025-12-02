require("dotenv").config()
const jwt = require('jsonwebtoken')


function authenticated (req,res,next) {
    const token = req.headers.token 
    const decodedInfo = jwt.verify(token , process.env.JWT_SECRET_USER)

    if(decodedInfo) {
        req.userId = decodedInfo._id
        next()
    } else {
        res.json({
            message: "You are not signed in"
        })
    }
}

module.exports = {
    authenticated
}