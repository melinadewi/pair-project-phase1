const express = require('express')
const router = express.Router()
const MovieController = require('../controllers/movieController.js')

router.get('/', MovieController.getList)
router.get('/:id', MovieController.getMovieDetail)
router.get('/:id/give-rating', MovieController.getRating)
router.post('/:id/give-rating', MovieController.postRating)

router.get('/:commentId/reply-comment', MovieController.getReply)
router.post('/:commentId/reply-comment', MovieController.postReply)

module.exports = router