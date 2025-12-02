require('dotenv').config()
const {Router} = require ("express")
const userRouter = Router()
const bcrypt = require ('bcrypt')
const {UserModel} = require('../models/UserModel')
const jwt = require('jsonwebtoken')



userRouter.post('/signup',async function(req,res) {
    const {username , email , password , role} = req.body

    const hashedPassword = await bcrypt.hash(password,5)

    let errorThrown = false

    try {
        await UserModel.create({
          email:email,
          password: hashedPassword,
          username:username, 
          role:role
        })
    } catch(e){
        res.status(403).json({
            message: "User already exists"
        })
        errorThrown = true
    }

    if(!errorThrown){
        res.json({
            message: "Account created succesfully"
        })
    }
})


userRouter.post('/signin', async function(req,res) {
    const {email,password} = req.body

    const user = await UserModel.findOne({
        email: email, 
    })

    if(!user){
        res.status(403).json({
            message: "Invalid Credentials"
        })
    }

    const matched = await bcrypt.compare(password , user.password)

    if(matched){
        const token = jwt.sign({
            id: user._id.toString()
        } , process.env.JWT_SECRET_USER)

        res.json({
            token: token
        })
    } else {
        res.status(403).json({
            message: "Invalid Credentials"
        })
    }
})


userRouter.get('/allproducts' , async function(req,res){

})


userRouter.get('/cart' , async function(req,res){
    res.json({
        message: "The products added in the cart are : "
    })
})


userRouter.get('/orders' , async function(req,res){
    res.json({
        message: " Here are all your orders: "
    })
})


module.exports = {
    userRouter: userRouter
}