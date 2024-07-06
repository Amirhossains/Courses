const express = require('express')
const searchController = require('./../../controllers/search')


const router = express.Router()

router.route('/:keyword').get(searchController.searchAnotherWay)

module.exports = router
