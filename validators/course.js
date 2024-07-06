const Validator = require('fastest-validator')

const v = new Validator()

const schema = {
    title: {
        type: 'string',
        min: 3,
        max: 24,
        required: true
    },
    score: {
        type: 'string',
        required: true,
        enum: ['0', '1', '2', '3', '4', '5']
    },
    description: {
        type: 'string',
        optional: true,
        default: "There is no description for this course yet!!"
    },
    support: {
        type: 'string',
        required: true
    },
    href: {
        type: 'string',
        required: true
    },
    price: {
        type: 'string',
        required: true
    },
    status: {
        type: 'string',
        required: true
    },
    discount: {
        type: 'string',
        required: true
    },
    category: {
        type: 'string',
        required: true
    },
    $$strict: true
}

const courseValidator = v.compile(schema)

module.exports = courseValidator
