const { isValidObjectId } = require('mongoose')
const courseModel = require('./../models/course')
const sessionModel = require('./../models/session')
const categoryModel = require('./../models/category')
const courseUserModel = require('./../models/course-user')
const commentModel = require('./../models/comment')
const courseValidator = require('./../validators/course')
const sessionValidator = require('./../validators/session')


module.exports.addCourse = async (req, res) => {
    const isValidCourse = courseValidator(req.body)
    if (isValidCourse !== true) {
        return res.status(422).json(isValidCourse)
    }

    const {
        title,
        score,
        description,
        support,
        href,
        price,
        status,
        discount,
        category
    } = req.body
    const isExistCourse = await courseModel.findOne({ title }).lean()
    if (isExistCourse) {
        return res.status(409).json({ message: "There is already a course with that title!!" })
    }

    const isValidCategoryId = isValidObjectId(category)
    if (!isValidCategoryId) {
        return res.status(422).json({ message: "The category id is not valid!!" })
    }

    const isExistCategory = await categoryModel.findById(category).lean()
    if (!isExistCategory) {
        return res.status(404).json({ message: "There is no category with that id!!" })
    }

    const createdCourse = await courseModel.create({
        title,
        score,
        description,
        cover: req.file.filename,
        support,
        href,
        price,
        status,
        discount,
        category,
        creator: req.user._id
    })
    const mainCourse = await courseModel.findById(createdCourse._id).populate('creator', '-password')
    res.status(201).json(mainCourse)
}

module.exports.addSession = async (req, res) => {
    const courseId = req.params.id
    const isValidId = isValidObjectId(courseId)
    if (!isValidId) {
        return res.status(422).json({ message: "The id is not valid!!" })
    }

    const course = await courseModel.findById(courseId)
    if (!course) {
        return res.status(404).json({ message: "There is no course with that id!!" })
    }

    const isValidSession = sessionValidator(req.body)
    if (isValidSession !== true) {
        return res.status(422).json(isValidSession)
    }

    const { title, time, free } = req.body
    const isExistSession = await sessionModel.findOne({ title }).lean()
    if (isExistSession) {
        return res.status(409).json({ message: "There is already a session with that title!!" })
    }

    const createdSession = await sessionModel.create({
        title,
        time,
        free,
        video: "test.mp4",
        course: courseId
    })
    res.status(201).json({ message: "The session created successfully :))", createdSession })
}

module.exports.getAllSessions = async (req, res) => {
    const sessions = await sessionModel.find({}).populate('course', 'title').lean()
    res.status(200).json(sessions)
}

module.exports.getSession = async (req, res) => {
    const course = await courseModel.findOne({ href: req.params.href }).lean()
    if (!course) {
        return res.status(404).json({ message: "There is no course with that href!!" })
    }

    const session = await sessionModel.findOne({ _id: req.params.sessionId }).lean()
    if (!session) {
        return res.status(404).json({ message: "There is no session with that id!!" })
    }

    const sessions = await sessionModel.find({ course: course._id }).lean()
    return res.status(200).json({ session, sessions })
}

module.exports.deleteSession = async (req, res) => {
    const isValidId = isValidObjectId(req.params.id)
    if (!isValidId) {
        return res.status(422).json({ message: "The id is not valid!!" })
    }

    const deletedSession = await sessionModel.findByIdAndDelete(req.params.id).lean()
    if (!deletedSession) {
        return res.status(404).json({ message: "There is no session with that id!!" })
    }
    res.status(200).json({ message: "The session delete successfully:))", deletedSession })
}

module.exports.register = async (req, res) => {
    const courseId = req.params.id
    const isValidId = isValidObjectId(courseId)
    if (!isValidId) {
        return res.status(422).json({ message: "The id is not valid!!" })
    }

    const isUserRegistered = await courseUserModel.findOne({
        user: req.user._id,
        course: courseId
    }).lean()
    if (isUserRegistered) {
        return res.status(409).json({ message: "You already registered in this course!!" })
    }

    const isExistCourse = await courseModel.findById(courseId).lean()
    if (!isExistCourse) {
        return res.status(404).json({ message: "There is no course with that id!!" })
    }

    await courseUserModel.create({
        course: courseId,
        user: req.user._id,
        price: req.body.price
    })
    res.status(201).json({ message: "You registered successfully:}}" })
}

module.exports.getCoursesByCategory = async (req, res) => {
    const href = req.params.href
    const category = await categoryModel.findOne({ href }).lean()
    if (!category) {
        return res.status(404).json({ message: "There is no category with that href!!" })
    }

    const courses = await courseModel.find({ category: category._id }).lean()
    res.status(200).json(courses)
}

module.exports.getCourse = async (req, res) => {
    const href = req.params.href
    const course = await courseModel.findOne({ href })
        .populate('creator', '-password')
        .populate('category')
        .lean()
    if (!course) {
        return res.status(404).json({ message: "There is no course with that href!!" })
    }

    const registeredCount = (await courseUserModel.find({ course: course._id }).lean()).length
    const sessions = await sessionModel.find({ course: course._id }).lean()
    const comments = await commentModel.find({ course: course._id, isAccept: true })
        .populate('creator', '-password')
        .populate('course').lean()

    const relatedCourses = await courseModel.find({
        category: course.category,
        _id: { $ne: course._id }
    }).lean()

    // relatedCourses = relatedCourses.filter((Course) => Course.href !== href)

    let allComments = []
    let courseScore = 0
    let commentsCount = 0
    comments.forEach(comment => {
        let theComment = {
            ...comment,
            course: comment.course.title,
            creator: comment.creator.name,
            answerComment: []
        }
        comments.forEach(answerComment => {
            if (String(comment._id) === String(answerComment.mainCommentId)) {
                theComment.answerComment.push({
                    ...answerComment,
                    course: answerComment.course.title,
                    creator: answerComment.creator.name
                })
            }
        })
        allComments.push(theComment)

        if (course._id?.equals(comment.course._id)) {
            courseScore = courseScore + +comment.score
            commentsCount++
        }
    })

    if (commentsCount !== 0) {
        course.score = (Math.floor((courseScore / commentsCount) * 10)) / 10
    }

    const isUserRegisteredToThisCourse = !!(await courseUserModel.findOne({
        course: course._id,
        user: req.user._id
    }))
    res.status(200).json({
        course,
        sessions,
        comments: allComments,
        students: registeredCount,
        isUserRegisteredToThisCourse,
        relatedCourses
    })
}

module.exports.getAllCourses = async (req, res) => {
    const courses = await courseModel.find({})
        .sort({ updatedAt: -1 })
        .populate('category', 'title')
        .populate('creator', 'name')
        .lean()

    const courseUsers = await courseUserModel.find().lean()
    const sessions = await sessionModel.find().lean()
    const comments = await commentModel.find().lean()

    courses.forEach(course => {
        let registeredUsers = courseUsers.filter(registeredUser =>
            course._id?.equals(registeredUser.course
            ))

        let minutes = 0
        let seconds = 0
        sessions.forEach(session => {
            if (course._id?.equals(session.course)) {
                minutes = minutes + Number(session.time.split(':')[0])
                seconds = seconds + Number(session.time.split(':')[1])
            }
        })

        let courseScore = 0
        let commentCount = 0
        comments.forEach(comment => {
            if (comment.isAccept) {
                if (course._id?.equals(comment.course)) {
                    courseScore = courseScore + comment.score
                    commentCount++
                }
            }
        })

        if (commentCount === 0) {
            course.score = 5.0
        } else {
            course.score = (Math.floor((courseScore / commentCount) * 10)) / 10
        }
        course.courseTime = minutes + Math.floor(seconds / 60)
        course.students = registeredUsers.length
    })


    res.status(200).json({ courses })
}

module.exports.deleteCourse = async (req, res) => {
    const isValidId = isValidObjectId(req.params.id)
    if (!isValidId) {
        return res.status(422).json({ message: "The id is not valid!!" })
    }

    const deletedCourse = await courseModel.findByIdAndDelete(req.params.id)
    if (!deletedCourse) {
        return res.status(404).json({ message: "There is no course with that id!!" })
    }
    res.status(200).json({ message: "The course deleted successfully:))", deletedCourse })
}

module.exports.popularCourses = async (req, res) => {
    const courses = await courseModel.find({}, null, { sort: { score: -1 } }).limit(3).lean()
    res.status(200).json(courses)
}

module.exports.getCoursesByStatus = async (req, res) => {
    const courses = await courseModel.find({ status: req.params.status }).lean()
    if (!courses) {
        return res.status(404).json({ message: "There is no course with that status!!" })
    }
    res.status(200).json(courses)
}
