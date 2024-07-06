const mongoose = require('mongoose')


const banSchema = new mongoose.Schema({
    phone: {
        type: String,
        required: true
    }
},
{timestamps: true})

const banModel = mongoose.model('banned users', banSchema)

module.exports = banModel
