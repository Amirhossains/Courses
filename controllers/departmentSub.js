const { isValidObjectId } = require('mongoose')
const departmentModel = require('./../models/department')
const departmentSubModel = require('./../models/department-sub')

module.exports.getAll = async (req, res) => {
    const department = await departmentModel.findById(req.params.id)
    if (!department) {
        return res.status(404).json({message: "There is no department with that id!!"})
    }

    const departmentSubs = await departmentSubModel.find({
        parent: department._id
    })
    res.status(200).json(departmentSubs)
}

module.exports.create = async (req, res) => {
    const department = await departmentModel.findById(req.params.id)
    if (!department) {
        return res.status(404).json({message: "There is no department with that id!!"})
    }

    const isExistDepartmentSub = await departmentSubModel.findOne({
        title: req.body.title
    })
    if (isExistDepartmentSub) {
        return res.status(409).json({message: "There already is a department sub with that title!!"})
    }

    const createdDepartmentSub = await departmentSubModel.create({
        title: req.body.title,
        parent: department._id
    })
    res.status(201).json({message: "The departmentSub created successfully :))", createdDepartmentSub})
}

module.exports.deleteDepartmentSub = async (req, res) => {
    const department = await departmentModel.findById(req.params.id)
    if (!department) {
        return res.status(404).json({message: "There is no department with that id!!"})
    }

    const isValidId = isValidObjectId(req.params.subId)
    if (!isValidId) {
        return res.status(422).json({message: "The department sub id is not valid!!"})
    }

    const deletedDepartmentSub = await departmentSubModel.findByIdAndDelete(req.params.subId)
    if (!deletedDepartmentSub) {
        return res.status(404).json({message: "There is no departmentSub with that id"})
    }
    res.status(200).json({message: "The departmentSub deleted successfully :))", deletedDepartmentSub})
}