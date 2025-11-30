const mongoose = require('mongoose')
const {Schema} = mongoose

const User = new Schema ({
    username: {type: String , unique: true , required: true},
    email: {type: String , unique: true , required: true}, 
    password: {type: String , required: true}, 
    role : {
        type: String, 
        enum: ["customer" , "admin" , "vendor"],
        default: "customer", 
    }
})

const UserModel = mongoose.model('users',User)


module.exports = {
    UserModel: UserModel
}