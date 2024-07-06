const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const authRouter = require('./routes/v1/auth')
const usersRouter = require('./routes/v1/users')
const categoriesRouter = require('./routes/v1/category')
const coursesRouter = require('./routes/v1/course')
const commentsRouter = require('./routes/v1/comment')
const contactsRouter = require('./routes/v1/contact')
const newsletterRouter = require('./routes/v1/newsletter')
const searchRouter = require('./routes/v1/search')
const notificationRouter = require('./routes/v1/notification')
const offCodeRouter = require('./routes/v1/offCode')
const articleRouter = require('./routes/v1/article')
const orderRouter = require('./routes/v1/order')
const ticketsRouter = require('./routes/v1/ticket')
const menuRouter = require('./routes/v1/menu')
const path = require('path')


const app = express()

// Middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded())
app.use(morgan('dev'))
app.use(
    '/courses/covers',
    express.static(path.join(__dirname, 'public', 'courses', 'covers'))
)

// Routes
app.use('/v1/auth', authRouter)
app.use('/v1/users', usersRouter)
app.use('/v1/category', categoriesRouter)
app.use('/v1/courses', coursesRouter)
app.use('/v1/comments', commentsRouter)
app.use('/v1/contact-us', contactsRouter)
app.use('/v1/newsletters/emails', newsletterRouter)
app.use('/v1/search', searchRouter)
app.use('/v1/notifications', notificationRouter)
app.use('/v1/off-codes', offCodeRouter)
app.use('/v1/articles', articleRouter)
app.use('/v1/orders', orderRouter)
app.use('/v1/tickets', ticketsRouter)
app.use('/v1/menu', menuRouter)

app.use((req, res, next, err) => {
    res.json({
        statusCode: err.status || 500,
        message: err.message || "Server Error!!"
    })
})

module.exports = app
