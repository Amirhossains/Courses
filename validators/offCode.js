const Validator = require('fastest-validator')

const v = new Validator()

const schema = {
    code: {
        type: 'string',
        required: true
    },
    percent: {
        type: 'number',
        max: 100,
        min: 0,
        required: true
    },
    course: {
        type: 'string',
        required: true
    },
    maxUsableNumber: {
        type: 'number',
        required: true
    },
    uses: {
        type: 'number',
        default: 0,
        optional: true
    },
}

const offCodeValidator = v.compile(schema)

module.exports = offCodeValidator
