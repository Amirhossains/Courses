const userModel = require('./../models/user')

module.exports = async (req, res, next) => {
    const isAdmin = req.user.role === 'ADMIN'

    if (isAdmin) {
        return next()
    }

    res.status(403).json({message: "Only admins have access to this api :(("})
}