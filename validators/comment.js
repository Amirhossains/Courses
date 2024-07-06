const Validator = require('fastest-validator')

const v = new Validator

const schema = {
    body: {
        type: 'string',
        required: true
    },
    courseHref: {
        type: 'string',
        required: true
    },
    score: {
        type: 'number',
        optional: true,
        default: 5
    },
    $$strict: true
}

const commentValidator = v.compile(schema)

module.exports = commentValidator
