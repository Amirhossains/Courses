const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    email: {
        type: 'string',
        required: true
    }
}, {timestamps: true})

const newslettersModel = mongoose.model('newsletters', schema)

module.exports = newslettersModel
