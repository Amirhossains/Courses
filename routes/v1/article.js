const express = require('express')
const authMiddleware = require('./../../middlewares/auth')
const isAdminMiddleware = require('./../../middlewares/isAdmin')
const isValidIdMiddleware = require('./../../middlewares/isValidId')
const articleController = require('./../../controllers/article')
const multer = require('multer')
const multerStorage = require('./../../utils/uploader-articles')

const router = express.Router()

router
.route('/')
.get(articleController.getAllPublished)
.post(
    authMiddleware,
    multer({storage: multerStorage, limits: {fileSize: 10000000}}).single('article-cover'),
    articleController.create
)

router
.route('/all')
.get(authMiddleware, isAdminMiddleware, articleController.getAll)

router
.route('/:href/publish')
.get(authMiddleware, isAdminMiddleware, articleController.publish)

router
.route('/draft/:id')
.get(authMiddleware, isValidIdMiddleware, articleController.getDraftArticle)
.put(authMiddleware, isValidIdMiddleware,
    multer({storage: multerStorage, limits: {fileSize: 10000000}}).single('article-cover'),
    articleController.updateDraftArticle
)

router
.route('/:href')
.get(articleController.getOne)

router
.route('/:id')
.delete(authMiddleware, isAdminMiddleware, isValidIdMiddleware, articleController.deleteArticle)


module.exports = router
