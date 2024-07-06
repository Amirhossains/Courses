const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    parent: {
        type: mongoose.Types.ObjectId,
        ref: 'departments',
        required: true
    }
}, {timestamps: true})

const subModel = mongoose.model('department-subs', schema)

module.exports = subModel
