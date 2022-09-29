const express = require("express")
// mergeParams allows us to use post routes
const router = express.Router({ mergeParams: true})
const {getComments, addComment} = require('../controllers/commentController')
const { protect } = require('../middleware/authMiddleware')

// router.route allows additional methods to be chained on (i.e. get/post)
// route /api/posts/:postId/comments
router.route('/').get(getComments).post(protect, addComment)

module.exports = router;