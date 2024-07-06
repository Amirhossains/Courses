const express = require('express')
const commentController = require('./../../controllers/comment')
const authMiddleware = require('./../../middlewares/auth')
const isAdminMiddleware = require('./../../middlewares/isAdmin')
const isValidIdMiddleware = require('./../../middlewares/isValidId')

const commentsRouter = express.Router()


commentsRouter.route('/').post(authMiddleware, commentController.addComment)
.get(authMiddleware, isAdminMiddleware, commentController.getAll)


commentsRouter.route('/:id').delete(
    authMiddleware, isAdminMiddleware,
    isValidIdMiddleware, commentController.deleteComment
)

commentsRouter.route('/:id/accept').put(
    authMiddleware, isAdminMiddleware,
    isValidIdMiddleware, commentController.acceptComment
)

commentsRouter.route('/:id/reject').put(
    authMiddleware, isAdminMiddleware,
    isValidIdMiddleware, commentController.rejectComment
)

commentsRouter.route('/:id/answer').post(
    authMiddleware, isAdminMiddleware,
    isValidIdMiddleware, commentController.answerComment
)

module.exports = commentsRouter