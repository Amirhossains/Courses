const Validator = require('fastest-validator')

const v = new Validator()

const schema = {
    title: {
        type: 'string',
        required: true
    },
    body: {
        type: 'string',
        required: true
    },
    departmentId: {
        type: 'string',
        required: true
    },
    departmentSubId: {
        type: 'string',
        required: true
    },
    priority: {
        type: 'number',
        required: true
    },
    parent: {
        type: 'string',
        optional: true
    },
    course: {
        type: 'string',
        optional: true
    },
    $$strict: true
}

const ticketValidator = v.compile(schema)

module.exports = ticketValidator
