const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: false,
    },
    cover: {
        type: String,
        required: true
    },
    support: {
        type: String,
        required: true
    },
    href: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: 'categories',
        required: true
    },
    creator: {
        type: mongoose.Types.ObjectId,
        ref: 'users',
        required:true
    }
}, { timestamps: true })


schema.virtual('sessions', {
    ref: 'sessions',
    localField: '_id',
    foreignField: 'course'
})

schema.virtual('comments', {
    ref: 'comments',
    localField: '_id',
    foreignField: 'course'
})


const courseModel = mongoose.model('courses', schema)

module.exports = courseModel