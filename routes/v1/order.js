const express = require('express')
const authMiddleware = require('./../../middlewares/auth')
const isValidId = require('./../../middlewares/isValidId')
const orederController = require('./../../controllers/order')

const router = express.Router()

router
.route('/')
.get(authMiddleware, orederController.getAll)

router
.route('/:id')
.get(authMiddleware, isValidId, orederController.getOne)

module.exports = router
