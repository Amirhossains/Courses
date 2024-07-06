require('dotenv').config()
const mongoose = require('mongoose')
const app = require('./app')


const a = (async () => {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Server connected to mongodb successfully :))")
})()

app.listen(process.env.PORT,
    console.log(`Server Is Running On Port ${process.env.PORT}`))
