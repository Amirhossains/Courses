const Validator = require('fastest-validator')

const v = new Validator()

const schema = {
    title: {
        type: 'string',
        required: true
    },
    href: {
        type: 'string',
        required: true
    },
    parent: {
        type: 'string',
        optional: true
    },
    $$strict: true
}

const menuValidator = v.compile(schema)

module.exports = menuValidator
