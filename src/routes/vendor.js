const {Router} = require("express")
const vendorRouter = Router()
const {UserModel} = require('../models/UserModel')
const bcrypt = require ('bcrypt')
const jwt = require('jsonwebtoken')
const { authorizedRoles , authMiddleware } = require("../middlewares/roleMiddleware")

vendorRouter.post('/signin', async function(req,res) {
    const {email,password , role} = req.body
    
        const user = await UserModel.findOne({
            email: email, 
            role: "vendor"
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

vendorRouter.post('/add-products' , authMiddleware ,  authorizedRoles("vendor") , async function (req,res){
   const {name,price} = req.body 

   await ProductsModel.create({
      name: name, 
      price: price
   })

   res.json({
      message: "Products added succesfully"
   })
})



module.exports = {
   vendorRouter: vendorRouter
}