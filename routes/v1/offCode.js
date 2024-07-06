const express = require('express')
const authMiddleware = require('./../../middlewares/auth')
const isAdminMiddleware = require('./../../middlewares/isAdmin')
const isValidId = require('./../../middlewares/isValidId')
const offCodeController = require('./../../controllers/offCode')

const router = express.Router()

router
.route('/')
.post(authMiddleware, isAdminMiddleware, offCodeController.addOffCode)
.get(authMiddleware, isAdminMiddleware, offCodeController.getAll)

router
.route('/all')
.put(authMiddleware, isAdminMiddleware, offCodeController.setOnAll)

router
.route('/:code')
.post(authMiddleware, offCodeController.useOffCode)

router
.route('/:id')
.delete(authMiddleware, isAdminMiddleware, isValidId, offCodeController.deleteOffCode)

module.exports = router
