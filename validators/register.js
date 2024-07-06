const Validator = require('fastest-validator')
const v = new Validator()

const registerSchema = {
    name: {
        type: 'string',
        min: 3,
        max: 24,
        required: true
    },
    username: {
        type: 'string',
        min:4,
        max:24,
        required: true
    },
    email: {
        type: 'email',
        required: true
    },
    password: {
        type: 'string',
        min: 8,
        max: 18,
        required: true
    },
    configPassword: {
        type: 'equal',
        field: 'password'
    },
    phone: {
        type: 'string',
        min: 10,
        max: 14,
        required: true
    },
    $$strict: true
}

const registerValidator =  v.compile(registerSchema)

module.exports = registerValidator
