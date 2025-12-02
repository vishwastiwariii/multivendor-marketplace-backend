const mongoose = require('mongoose')
const {Schema} = mongoose
const ObjectId = mongoose.Types.ObjectId

const Products = new Schema ({
    userId: ObjectId,
    name: String, 
    price: String,
})

const ProductsModel = mongoose.model("products", Products)

module.exports = {
    ProductsModel
}