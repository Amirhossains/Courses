const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    title: {
        type: String,
        requried: true
    }
}, {timestamps: true})

const departmentModel = mongoose.model('departments', schema)

module.exports = departmentModel