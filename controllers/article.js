const categoryModel = require('../models/category')
const articleValidator = require('../validators/article')
const articleModel = require('./../models/article')


module.exports.getAllPublished = async (req, res) => {
    const articles = await articleModel.find({publish: true}).lean()
    res.status(200).json(articles)
}

module.exports.getAll = async (req, res) => {
    const articles = await articleModel.find().lean()
    res.status(200).json(articles)
}

module.exports.create = async (req, res) => {
    const isValidArticle = articleValidator(req.body)
    if (isValidArticle!==true) {
        return res.status(422).json(isValidArticle)
    }

    const { title, description, body, href, category } = req.body
    const isExistCategory = await categoryModel.findById(category)
    if (!isExistCategory) {
        return res.status(404).json({message: "Ther eis no category with that id!!"})
    }

    const isExistHref = await articleModel.findOne({href})
    if (isExistHref) {
        return res.status(409).json({message: "This href already exists!!"})
    }

    const createdArticle = await articleModel.create({
        title,
        description,
        body,
        cover: req.file.filename,
        href,
        category,
        creator: req.user._id
    })
    res.status(201).json({message: 'article created successfully :))', createdArticle})
}

module.exports.getOne = async (req, res) => {
    const article = await articleModel.findOne({
        href: req.params.href,
        publish: true
    })
    .populate('creator', 'name username email')
    .populate('category', 'title')
    if (!article) {
        return res.status(404).json({message: "There is no article with that id!!"})
    }

    res.status(200).json(article)
}

module.exports.getDraftArticle = async (req, res) => {
    const draftArticle = await articleModel.findOne({
        _id: req.params.id,
        publish: false
    })
    if (!draftArticle) {
        return res.status(404).json({message: "There is no draft article with that id!!"})
    }
    res.status(200).json(draftArticle)
}

module.exports.updateDraftArticle = async (req, res) => {
    const draftArticle = await articleModel.findOneAndUpdate({
        _id: req.params.id,
        publish: false
    }, {
        body: req.body.body
    }, {
        new: true
    })
    if (!draftArticle) {
        return res.status(404).json({message: "There is no draft article with that id!!"})
    }
    res.status(203).json({message: "The article updated successsfully", updatedArticle: draftArticle})
}

module.exports.publish = async (req, res) => {
    const article = await articleModel.findOneAndUpdate({
        href: req.params.href,
        publish: false
    }, {
        publish: true
    }, {
        new: true
    })
    .populate('creator', 'name username email')
    .populate('category', 'title')
    if (!article) {
        return res.status(404).json({message: "There is no unpublished article with that href!!"})
    }
    res.status(203).json({message: "Article published successfully :))", article})
}

module.exports.deleteArticle = async (req, res) => {
    const article = await articleModel.findByIdAndDelete(req.params.id)
    if (!article) {
        return res.status(404).json({message: "There is no article with that id!!"})
    }
    res.status(200).json({message: "Article deleted successfully :))", article})
}
