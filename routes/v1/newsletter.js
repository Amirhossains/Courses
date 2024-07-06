const express = require('express')
const authMiddleware = require('./../../middlewares/auth')
const isAdminMiddleware = require('./../../middlewares/isAdmin')
const newsletterController = require('./../../controllers/newsletter')


const router = express.Router()

router.route('/').get(authMiddleware, isAdminMiddleware, newsletterController.getAll)
.post(newsletterController.addEmail)

module.exports = router
