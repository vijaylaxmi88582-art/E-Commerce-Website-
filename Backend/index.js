const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')

const app = express()

dotenv.config()
app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 5000

mongoose.connect(process.env.MONGO_URI || process.env.Mongo_URI)
    .then(() => console.log("Database Connected"))
    .catch((err) => console.log(err))

app.get('/', (req, res) => {
    res.send("I am coming from backend 😊")
})

const userRouter = require('./routes/userRoute')
app.use('/api/user', userRouter)

const categoryRouter = require('./routes/categoryRoute')
app.use('/api/category', categoryRouter)

const productRouter = require('./routes/productRoute')
app.use('/api/product', productRouter)

const orderRouter = require('./routes/orderRoute')
app.use('/api/order', orderRouter)

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`)
})
