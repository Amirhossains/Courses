const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    departmentId: {
        type: mongoose.Types.ObjectId,
        ref: 'departments',
        required: true
    },
    departmentSubId: {
        type: mongoose.Types.ObjectId,
        ref: 'department-subs',
        required: true
    },
    priority: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    creator: {
        type: mongoose.Types.ObjectId,
        ref: 'users',
        required: true
    },
    answer: {
        type: Boolean,
        default: false,
        requried: true
    },
    course: {
        type: mongoose.Types.ObjectId,
        ref: 'courses',
        required: false
    },
    isAnswer: {
        type: Boolean,
        required: true,
        default: false
    },
    parent: {
        type: mongoose.Types.ObjectId,
        ref: 'tickets',
        required: false
    }
}, {timestamps: true})

const ticketModel = mongoose.model('ticket', schema)

module.exports = ticketModel
