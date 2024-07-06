const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    free: {
        type: Boolean,
        required: true
    },
    video: {
        type: String,
        required: true
    },
    course: {
        type: mongoose.Types.ObjectId,
        ref: 'courses'
    }
}, {timestamps: true})

const sessionModel = mongoose.model('sessions', schema)

module.exports = sessionModel