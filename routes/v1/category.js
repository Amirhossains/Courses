const express = require('express')
const categoryController = require('./../../controllers/category')
const authMiddleware = require('./../../middlewares/auth')
const isAdminMiddleware = require('./../../middlewares/isAdmin')

const categoryRouter = express.Router()

categoryRouter
    .route('/')
    .post(authMiddleware, isAdminMiddleware, categoryController.addCategory)
    .get(authMiddleware, isAdminMiddleware, categoryController.getAll)

categoryRouter
    .route('/:id')
    .get(authMiddleware, isAdminMiddleware, categoryController.getOne)
    .delete(authMiddleware, isAdminMiddleware, categoryController.deleteCategory)
    .put(authMiddleware, isAdminMiddleware, categoryController.updateCategory)

module.exports = categoryRouter