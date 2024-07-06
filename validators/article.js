const Validator = require('fastest-validator')

const v = new Validator()

const schema = {
    title: {
        type: 'string',
        required: true
    },
    description: {
        type: 'string',
        required: true
    },
    body: {
        type: 'string',
        requried: true
    },
    href: {
        type: 'string',
        required: true
    },
    category: {
        type: 'string',
        required: true
    },
    $$strict: true
}

const articleValidator = v.compile(schema)

module.exports = articleValidator
