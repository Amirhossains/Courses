const courseUserModel = require('./../models/course-user')

module.exports.getAll = async (req, res) => {
    const orders = await courseUserModel.find({
        user: req.user._id
    }).populate('course', 'title href').lean()
    res.status(200).json(orders)
}

module.exports.getOne = async (req, res) => {
    const order = await courseUserModel.findOne({
        _id :req.params.id,
        user: req.user._id
    })
    .populate('course', 'title href').lean()
    if (!order) {
        return res.status(404).json({message: "You have no course with that id!!"})
    }
    res.status(200).json(order)
}
