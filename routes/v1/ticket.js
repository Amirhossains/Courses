const express = require('express')
const authMiddleware = require('./../../middlewares/auth')
const isAdminMiddleware = require('./../../middlewares/isAdmin')
const isValidId = require('../../middlewares/isValidId')
const ticketController = require('./../../controllers/ticket')
const departmentController = require('./../../controllers/department')
const departmentSubController = require('./../../controllers/departmentSub')

const router = express.Router()

router
.route('/')
.get(authMiddleware, isAdminMiddleware, ticketController.getAll)
.post(authMiddleware, ticketController.create)

router
.route('/user')
.get(authMiddleware, ticketController.userTickets)

router
.route('/answer')
.post(authMiddleware, isAdminMiddleware, ticketController.answerTicket)

router
.route('/:id/answer')
.get(authMiddleware, isValidId, ticketController.getAnswer)





router
.route('/departments')
.get(departmentController.getAll)
.post(authMiddleware, isAdminMiddleware, departmentController.create)

router
.route('/departments/:id')
.delete(departmentController.delete)

router
.route('/departments/:id/department-subs')
.get(departmentSubController.getAll)
.post(authMiddleware, isAdminMiddleware, isValidId, departmentSubController.create)

router
.route('/departments/:id/department-subs/:subId')
.delete(authMiddleware, isAdminMiddleware, isValidId, departmentSubController.deleteDepartmentSub)

module.exports = router