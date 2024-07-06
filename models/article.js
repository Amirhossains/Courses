const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    cover: {
        type: String,
        required: true
    },
    href: {
        type: String,
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
        required: true
    },
    publish: {
        type: Boolean,
        default: false,
        required: true
    }
}, { timestamps: true})

schema.virtual('comments', {
    ref: 'comments',
    localField: '_id',
    foreignField: 'course'
})

const model = mongoose.model('articles', schema)

module.exports = model
