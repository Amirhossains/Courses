const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    href: {
        type: String,
        required: true
    }
})

const categoryModel = mongoose.model('categories', schema)

module.exports = categoryModel
