const { isValidObjectId } = require('mongoose')
const commentModel = require('./../models/comment')
const courseModel = require('./../models/course')
const commentValidator = require('./../validators/comment')

module.exports.addComment = async (req, res) => {
    const isValidComment = commentValidator(req.body)
    if (isValidComment !== true) {
        return res.status(422).json(isValidComment)
    }

    const { body, score, courseHref } = req.body
    const foundCourse = await courseModel.findOne({href: courseHref}).lean()
    if (!foundCourse) {
        return res.status(404).json({message: "There is no course with that href!!"})
    }

    const createdComment = await commentModel.create({
        body,
        score,
        course: foundCourse._id,
        creator: req.user._id
    })
    res.status(201).json({message: "The comment created successfully:))", createdComment})
}

module.exports.deleteComment = async (req, res) => {
    const deletedComment = await commentModel.findByIdAndDelete(commentId).lean()
    if (!deletedComment) {
        return res.status(404).json({message: "There is no comment with that id!!"})
    }
    res.status(200).json({message: "The comment deleted successfully :))", deletedComment})
}

module.exports.acceptComment = async (req, res) => {
    const updatedComment = await commentModel.findByIdAndUpdate(req.params.id, {
        isAccept: true
    }, {new: true})
    if (!updatedComment) {
        return res.status(404).json({message: "There is no comment with that id!!"})
    }
    res.status(203).json({message: "The comment accepted seccessfully:))", updatedComment})
}

module.exports.rejectComment = async (req, res) => {    
    const updatedComment = await commentModel.findByIdAndUpdate(req.params.id, {
        isAccept: false
    }, {new: true})
    if (!updatedComment) {
        return res.status(404).json({message: "There is no comment with that id!!"})
    }
    res.status(203).json({message: "The comment rejected successfully:))", updatedComment})
}

module.exports.answerComment = async (req, res) => {
    const updatedComment = await commentModel.findByIdAndUpdate(req.params.id, {
        isAccept: true,
    })
    if (!updatedComment) {
        return res.status(404).json({message: "There is no comment with that id!!"})
    }

    const newComment = await commentModel.create({
        body: req.body.body,
        course: updatedComment.course,
        creator: req.user._id,
        isAccept: true,
        isAnswer: true,
        mainCommentId: updatedComment._id
    })
    res.status(201).json({message: "Comment created successfuly:))", newComment})
}

module.exports.getAll = async (req, res) => {
    const comments = await commentModel.find()
    .populate('course', 'title').populate('creator', 'name')
    .populate('mainCommentId', 'body').lean()
    res.status(200).json(comments)
}