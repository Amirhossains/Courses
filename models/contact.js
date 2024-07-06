const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    answer: {
        type: Boolean,
        required: true,
        default: false
    },
    body: {
        type: String,
        required: true
    }
}, { timestamps: true })

const contactModel = mongoose.model('contact-us', schema)

module.exports = contactModel
