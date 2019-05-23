const express = require('express')
const router = express.Router()
const MovieController = require('../controllers/movieController.js')

router.get('/', MovieController.getList)
router.get('/:id', MovieController.getMovieDetail)
router.get('/:id/give-rating', MovieController.getRating)
router.post('/:id/give-rating', MovieController.postRating)

module.exports = router