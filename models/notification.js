const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    adminId: {
        type: mongoose.Types.ObjectId,
        ref: 'users',
        required:true
    },
    seen: {
        type: Boolean,
        default: false,
        required: true
    }
}, {timestamps: true})

const notificationModel = mongoose.model('notifications', schema)

module.exports = notificationModel
