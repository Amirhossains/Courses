const { isValidObjectId } = require("mongoose")


module.exports = async (req, res, next) => {
    const isValidId = isValidObjectId(req.params.id)
    if (!isValidId) {
        return res.status(422).json({message: "The id is not valid"})
    }
    next()
}