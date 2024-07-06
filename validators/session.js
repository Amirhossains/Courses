const Validator = require('fastest-validator')
const v = new Validator()

const schema = {
    title: {
        type: 'string',
        required: true
    },
    time: {
        type: 'string',
        required: true
    },
    free: {
        type: 'boolean',
        required: true
    },
    $$strict: true
}

const sessionValidator = v.compile(schema)

module.exports = sessionValidator