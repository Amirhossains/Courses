const { isValidObjectId } = require('mongoose')
const ticketModel = require('./../models/ticket')
const ticketValidator = require('./../validators/ticket')
const departmentModel = require('./../models/department')
const departmentSubModel = require('./../models/department-sub')
const courseModel = require('./../models/course')


module.exports.userTickets = async (req, res) => {
    const tickets = await ticketModel.find({
        creator: req.user._id
    }).sort({updatedAt: -1})
    .populate('departmentId', 'title')
    .populate('departmentSubId', 'title')
    .populate('creator', 'name username email')
    .lean()
    res.status(200).json(tickets)
}

module.exports.getAll = async (req, res) => {
    const tickets = await ticketModel.find({ answer: false })
    .populate('departmentId', 'title')
    .populate('departmentSubId', 'title')
    .populate('creator', 'name username email')
    .lean()
    res.status(200).json(tickets)
}

module.exports.create = async (req, res) => {
    const isValidTicket = ticketValidator(req.body)
    if (isValidTicket!==true) {
        return res.status(422).json(isValidTicket)
    }

    const { title, body, departmentId, departmentSubId, priority, parent, course } = req.body
    const isValidId1 = isValidObjectId(departmentId)
    const isValidId2 = isValidObjectId(departmentSubId)
    if (!isValidId1 || !isValidId2) {
        return res.status(422).json({message: "Department id or departmentSub id is not valid!!"})
    }

    if (typeof course === 'string') {
        const isValidCourseId = isValidObjectId(course)
        if (!isValidCourseId) {
            return res.status(422).json({message: "The course id is not valid"})
        }
        const isExistCourse = await courseModel.findById(course)
        if (!isExistCourse) {
            return res.status(404).json({message: "There is no course with that id!!"})
        }
    }

    const isExistDepartment = await departmentModel.findById(departmentId)
    const isExistDepartmentSub = await departmentSubModel.findById(departmentSubId)
    if (!isExistDepartment || !isExistDepartmentSub) {
        return res.status(404).json({message: "There is no department or departmentSub with that id!!"})
    }

    const createdTicket = await ticketModel.create({
        title, 
        body, 
        departmentId, 
        departmentSubId, 
        priority, 
        parent, 
        course,
        creator: req.user._id,

    })
    res.status(201).json({message: "The ticket created successfully :))", createdTicket})
}

module.exports.answerTicket = async (req, res) => {
    const { body, ticketId } = req.body
    const isValidId = isValidObjectId(ticketId)
    if (!isValidId) {
        return res.status(422).json({message: "The ticket id is not valid!!"})
    }

    const updatedTicket = await ticketModel.findByIdAndUpdate(ticketId,{
        answer: true
    }, {
        new: true
    })
    if (!updatedTicket) {
        return res.status(404).json({message: "there is no ticket with that id!!"})
    }

    const answer = await ticketModel.create({
        title: "Your ticket answer",
        body,
        departmentId: updatedTicket.departmentId,
        departmentSubId: updatedTicket.departmentSubId,
        priority: updatedTicket.priority,
        isAnswer: true,
        answer: false,
        parent: updatedTicket._id,
        creator: req.user._id
    })
    res.status(201).json({message: "The ticket answer created successfully :))", answer})
}

module.exports.getAnswer = async (req, res) => {
    const ticket = await ticketModel.findById(req.params.id)
    if (!ticket) {
        return res.status(404).json({messaage: "There is no ticket with that id!!"})
    }

    const ticketAnswers = await ticketModel.find({
        parent: ticket._id
    }).lean()
    if (ticketAnswers.length === 0) {
        return res.status(200).json({ticket, message: "There s no answer for this ticket yet!!"})
    }
    res.status(200).json({ticket, ticketAnswers})
}
