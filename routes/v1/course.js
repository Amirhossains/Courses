const express = require('express')
const coursesController = require('./../../controllers/course')
const multer = require('multer')
const multerStorage = require('./../../utils/uploader')
const authMiddleware = require('./../../middlewares/auth')
const isAdminMiddleware = require('./../../middlewares/isAdmin')

const coursesRouter = express.Router()

coursesRouter.route('/')
    .post(multer({ storage: multerStorage, limits: { fileSize: 10000 } }).single('cover'),
        authMiddleware, isAdminMiddleware,
        coursesController.addCourse)
    .get(coursesController.getAllCourses)


coursesRouter.route('/sessions').get(authMiddleware, isAdminMiddleware, coursesController.getAllSessions)


coursesRouter.route('/populars').get(coursesController.popularCourses)


coursesRouter.route('/:id').delete(authMiddleware, isAdminMiddleware, coursesController.deleteCourse)


coursesRouter.route('/:href').get(authMiddleware, coursesController.getCourse)


coursesRouter.route('/status/:status').get(coursesController.getCoursesByStatus)

coursesRouter.route('/category/:href').get(coursesController.getCoursesByCategory)


coursesRouter.route('/sessions/:id').delete(authMiddleware, isAdminMiddleware, coursesController.deleteSession)


coursesRouter.route('/:id/sessions')
    .post(authMiddleware, isAdminMiddleware,
        // multer({storage: multerStorage, limits: {fileSize: 100000000}}).single('session'),
        coursesController.addSession
    )

coursesRouter.route('/:id/register').post(authMiddleware, coursesController.register)


coursesRouter.route('/:href/:sessionId').get(authMiddleware, coursesController.getSession)


module.exports = coursesRouter
