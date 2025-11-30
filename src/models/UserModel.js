const mongoose = require('mongoose')
const {Schema} = mongoose

const User = new Schema ({
    username: String,
    email: String, 
    password: String, 
    role : {
        type: String, 
        enum: ["customer" , "admin" , "vendor"],
        default: "customer"
    }
})

const UserModel = mongoose.model('users',User)

module.exports({
    UserModel: UserModel
})