const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    body: {
        type: 'string',
        required: true
    },
    course: {
        type: mongoose.Types.ObjectId,
        ref: 'courses',
        required: true
    },
    creator: {
        type: mongoose.Types.ObjectId,
        ref: 'users',
        required: true
    },
    isAccept: {
        type: Boolean,
        default: false
    },
    score: {
        type: Number,
        default: 5,
        required: true
    },
    isAnswer: {
        type: Boolean,
        default: false
    },
    mainCommentId: {
        type: mongoose.Types.ObjectId,
        ref: 'comments'
    }
}, { timestaps: true }
)
const commentModel = mongoose.model('comments', schema)

module.exports = commentModel
