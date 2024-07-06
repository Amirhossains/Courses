const Validator = require('fastest-validator')

const v = new Validator()

const schema = {
    name: {
        type: 'string',
        required: true
    },
    email: {
        type: 'email',
        required: true
    },
    phone: {
        type: 'string',
        required: true
    },
    answer: {
        type: 'string',
        optional: true
    },
    body: {
        type: 'string',
        required: true
    }
}

const contactValidator = v.compile(schema)

module.exports = contactValidator
