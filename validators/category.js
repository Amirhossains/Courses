const Validator = require('fastest-validator')
const v = new Validator()

const schema = {
    title: {
        type: 'string',
        min: 3,
        max: 24,
        required: true
    },
    href: {
        type: 'string',
        min: 3,
        max: 24,
        required: true
    },
    $$strict: true
}

const categoryValidator = v.compile(schema)

module.exports = categoryValidator
