const jwt = require('jsonwebtoken')
const userModel = require('./../models/user')

module.exports = async (req, res, next) => {
    const authHeader = req.header('Authorization')?.split(' ')

    if (authHeader?.length !== 2) {
        return res.status(422).json({message: "You did not send any token :(("})
    }

    const token = authHeader[1]

    try {
        const payLoadToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
        const user = await userModel.findById(payLoadToken.id).lean()
        Reflect.deleteProperty(user, 'password')
        req.user = user
        next()
    } catch (errors) {
        res.status(422).json(errors)
    }
}
