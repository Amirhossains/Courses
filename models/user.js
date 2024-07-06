const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        minLength: 4,
        maxLength: 24,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["ADMIN", "USER"],
        default: "USER"
    }
},
{timestamps: true})

const userModel = mongoose.model("users", userSchema)

module.exports = userModel
