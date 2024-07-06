const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    percent: {
        type: Number,
        required: true
    },
    course: {
        type: mongoose.Types.ObjectId,
        ref: 'courses',
        required: true
    },
    maxUsableNumber: {
        type: Number,
        required: true
    },
    uses: {
        type: Number,
        default: 0,
    },
    creator: {
        type: mongoose.Types.ObjectId,
        ref: 'users',
        required: true
    }
}, { timestamps: true})

const model = mongoose.model('offCodes', schema)

module.exports = model
