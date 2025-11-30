require('dotenv').config()
const express = require ("express")
const app = express()
const mongoose = require('mongoose')
const { userRouter } = require('./src/routes/user')
const { vendorRouter } = require('./src/routes/vendor')


mongoose.connect(process.env.MONGO_URL)

app.use(express.json())

app.use('/user',userRouter)
app.use('/vendor',vendorRouter)

app.listen(3000)