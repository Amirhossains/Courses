const express = require('express')
const usersController = require('./../../controllers/users')
const authMiddleware = require('./../../middlewares/auth')
const isAdminMiddleware = require('./../../middlewares/isAdmin')

const usersRouter = express.Router()

usersRouter
    .route('/ban/:id')
    .post(authMiddleware, isAdminMiddleware, usersController.banUser)

usersRouter 
    .route('/:id?')
    .get(authMiddleware, isAdminMiddleware, usersController.getUsers)
    .delete(authMiddleware, isAdminMiddleware, usersController.delUser)

usersRouter
    .route('/')
    .put(authMiddleware, usersController.updateUser)

usersRouter
    .route('/role/:id')
    .put(authMiddleware, isAdminMiddleware, usersController.changeRole)

module.exports = usersRouter