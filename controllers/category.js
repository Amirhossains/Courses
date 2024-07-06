const { isValidObjectId } = require('mongoose')
const categoryModel = require('./../models/category')
const categoryValidator = require('./../validators/category')

module.exports.getAll = async (req, res) => {
    const categories = await categoryModel.find({}).lean()
    res.status(200).json(categories)
}

module.exports.getOne = async (req, res) => {
    const categoryId = req.params.id
    const isValidId = isValidObjectId(categoryId)
    if (!isValidId) {
        return res.status(422).json({message: "The id is not valid"})
    }

    const category = await categoryModel.findById(categoryId).lean()
    if (category) {
        return res.status(200).json(category)
    }
    res.status(404).json({message: "There is no category with that id :(("})
}

module.exports.addCategory = async (req, res) => {
    const isValidCategory = categoryValidator(req.body)
    if (isValidCategory !== true) {
        return res.status(422).json(isValidCategory)
    }
    
    const { title, href } = req.body
    const isExistCategory = await categoryModel.findOne({
        $or: [{title}, {href}]
    }).lean()
    if (isExistCategory) {
        return res.status(409).json({message: "There is a category with that href or title already!!"})
    }

    const createdCategory = await categoryModel.create({
        title,
        href
    })
    res.status(201).json({message: "The category created successfully :))", createdCategory})
}

module.exports.deleteCategory = async (req, res) => {
    const categoryId = req.params.id
    const isValidId = isValidObjectId(categoryId)
    if (!isValidId) {
        return res.status(422).json({message: "The id is not valid :(("})
    }

    const removedCategory = await categoryModel.findByIdAndDelete(categoryId)
    if (removedCategory) {
        return res.status(200).json({message: "The category removed successfully :))", removedCategory})
    }
    res.status(404).json({message: "There is no category with that id :(("})
}

module.exports.updateCategory = async (req, res) => {
    const isValidCategory = categoryValidator(req.body)
    if (isValidCategory !== true) {
        return res.status(422).json(isValidCategory)
    }

    const { title, href } = req.body
    const isExistCategory = await categoryModel.findOne({
        $or: [{title}, {href}]
    }).lean()
    if (isExistCategory) {
        return res.status(409).json({message: "There is a category with that title or href already!!"})
    }

    const categoryId = req.params.id
    const isValidId = isValidObjectId(categoryId)
    if (!isValidId) {
        return res.status(422).json({message: "The id is not valid :(("})
    }

    const updatedCategory = await categoryModel.findByIdAndUpdate(categoryId, {
        title,
        href
    }, {new: true}).lean()
    if (updatedCategory) {
        return res.status(203).json({message: "The category updated successfully :))", updatedCategory})
    }
    res.status(404).json({message: "There is no category with that id :(("})
}
