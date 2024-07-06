const express = require('express')
const menuController = require('./../../controllers/menu')
const authMiddleware = require('./../../middlewares/auth')
const isAdminMiddleware = require('./../../middlewares/isAdmin')
const isValidIdMiddleware = require('./../../middlewares/isValidId')

const router = express.Router()

router
.route('/')
.get(menuController.getAll)
.post(authMiddleware, isAdminMiddleware, menuController.create)

router
.route('/all')
.get(authMiddleware, isAdminMiddleware, menuController.getAllForAdmin)

router
.route('/:id')
.put(authMiddleware, isAdminMiddleware, isValidIdMiddleware, menuController.updateMenu)
.delete(authMiddleware, isAdminMiddleware, isValidIdMiddleware, menuController.delete)

module.exports = router
