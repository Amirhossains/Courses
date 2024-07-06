const express = require('express')
const notificationController = require('./../../controllers/notification')
const authMiddleware = require('./../../middlewares/auth')
const isAdminMiddleware = require('./../../middlewares/isAdmin')
const isValidId = require('./../../middlewares/isValidId')


const router = express.Router()


router.route('/').get(authMiddleware, isAdminMiddleware, notificationController.getAll)
.post(authMiddleware, isAdminMiddleware, notificationController.sendNotif)


router.route('/see-all').get(authMiddleware, isAdminMiddleware, notificationController.allNotif)


router.route('/:id').delete(isValidId, authMiddleware, isAdminMiddleware, notificationController.deleteNotif)


router.route('/:id/see').put(isValidId, authMiddleware, isAdminMiddleware, notificationController.seeNotif)


module.exports = router
