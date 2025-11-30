const mongoose = require('mongoose')
const {Schema} = mongoose

const User = new Schema ({
    username: {type: String , unique: true},
    email: {type: String , unique: true}, 
    password: String, 
    role : {
        type: String, 
        enum: ["customer" , "admin" , "vendor"],
        default: "customer", 
        unique: true
    }
})

const UserModel = mongoose.model('users',User)


module.exports = {
    UserModel: UserModel
}