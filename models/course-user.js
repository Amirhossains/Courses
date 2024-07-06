const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    course: {
        type: mongoose.Types.ObjectId,
        ref: 'courses',
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'users',
        required: true
    },
    price: {
        type: Number,
        required: true
    }
}, {timestamps: true})

const courseUserModel = mongoose.model('course-user', schema)

module.exports = courseUserModel