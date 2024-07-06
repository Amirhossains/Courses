const express = require('express')
const authMiddleware = require('./../../middlewares/auth')
const isAdminMiddleware = require('./../../middlewares/isAdmin')
const contactController = require('./../../controllers/contact')
const isValidId = require('../../middlewares/isValidId')

const router = express.Router()

router.route('/').get(authMiddleware, isAdminMiddleware, contactController.getAll)
.post(contactController.addMessage)


router.route('/answer').post(authMiddleware, isAdminMiddleware, contactController.answerMessage)


router.route('/:id').delete(authMiddleware, isAdminMiddleware, isValidId, contactController.deleteMessage)


module.exports = router