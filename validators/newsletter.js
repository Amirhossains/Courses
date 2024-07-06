const Validator = require('fastest-validator')

const v = new Validator()

const schema = {
    email: {
        type: 'email',
        required: true
    },
    $$strict: true
}

const newsletterValidator = v.compile(schema)

module.exports = newsletterValidator
