const departmentModel = require('./../models/department')

module.exports.getAll = async (req, res) => {
    const departments = await departmentModel.find().lean()
    res.status(200).json(departments)
}

module.exports.create = async (req, res) => {
    const isExistDepartment = await departmentModel.findOne({
        title: req.body.title
    })
    if (isExistDepartment) {
        return res.status(409).json({message: "There is a department with that title already!!"})
    }
    const createdDepartment = await departmentModel.create({
        title: req.body.title
    })
    res.status(201).json({message: "The department created successfully :))", createdDepartment})
}

module.exports.delete = async (req, res) => {
    const deletedDepartment = await departmentModel.findByIdAndDelete(req.params.id)
    if (!deletedDepartment) {
        return res.status(404).json({message: "There is no department with that id!!"})
    }
    res.status(200).json({message: "The department deleted successfully :))", deletedDepartment})
}
