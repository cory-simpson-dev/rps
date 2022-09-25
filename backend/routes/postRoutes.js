const express = require("express");
const router = express.Router();
// const upload = require("../middleware/multer");
const {getPosts, createPost} = require('../controllers/postController')
const { protect } = require('../middleware/authMiddleware')

// router.route allows additional methods to be chained on (i.e. get/post)
router.route('/').get(getPosts).post(protect, createPost)

module.exports = router;