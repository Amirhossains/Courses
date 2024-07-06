const offCodeValidator = require('./../validators/offCode')
const offCodeModel = require('./../models/offCode')
const courseModel = require('./../models/course')
const { isValidObjectId } = require('mongoose')

module.exports.addOffCode = async (req, res) => {
    const isValidCode = offCodeValidator(req.body)
    if (isValidCode!==true) {
        return res.status(422).json(isValidCode)
    }

    const { code, percent, course, maxUsableNumber, uses } = req.body
    const isValidId = isValidObjectId(course)
    if (!isValidId) {
        return res.status(422).json({message: "The course Id is not valid!!"})
    }

    const foundCourse = await courseModel.findById(course)
    if (!foundCourse) {
        return res.status(404).json({message: "There is no course with that id!!"})
    }

    const isExistCode = await offCodeModel.findOne({code})
    if (isExistCode) {
        return res.status(409).json({message: "This code already is exist!!"})
    }

    const createdCode = await offCodeModel.create({
        code,
        percent,
        course,
        maxUsableNumber,
        uses,
        creator: req.user._id
    })
    res.status(201).json({message: "Off Code added successfully :))", createdCode})
}

module.exports.getAll = async (req, res) => {
    const offCodes = await offCodeModel
    .find({}, '-__v')
    .populate('course', 'title href')
    .populate('creator', 'username name email')
    .lean()
    return res.status(200).json(offCodes)
}

module.exports.setOnAll = async (req, res) => {
    const discount = req.body.discount
    if (discount > 100 || discount < 0) {
        return res.status(422).json({message: "The discount must be betwenn 0 and 100."})
    }
    await courseModel.updateMany({ discount })
    return res.status(203).json({message: "The discount added successfully :))"})
}

module.exports.deleteOffCode = async (req, res) => {
    const deletedOffCode = await offCodeModel.findByIdAndDelete(req.params.id)
    if (!deletedOffCode) {
        return res.status(404).json({message: "There is no code with that id!!"})
    }
    res.status(200).json({message: "The off code deleted successfully :))", deletedOffCode})
}

module.exports.useOffCode = async (req, res) => {
    const course = req.body.course
    const isValidId = isValidObjectId(course)
    if (!isValidId) {
        return res.status(422).json({message: "The id is not valid!!"})
    }

    const offCode = await offCodeModel.findOne({
        code: req.params.code,
        course
    })
    if (!offCode) {
        return res.status(404).json({message: "That off code does'nt exist!!"})
    }

    if (offCode.maxUsableNumber === offCode.uses) {
        return res.status(409).json({message: "Off code already used!!"})
    }

    const updatedCode = await offCodeModel.findByIdAndUpdate(offCode._id,
        {uses: offCode.uses+1}
    )
    res.status(200).json({message: "Code used successfully :))", code: updatedCode})
}