const express = require("express");
const router = express.Router();
// const upload = require("../middleware/multer");
const {getPosts, getPost, createPost, deletePost, updatePost} = require('../controllers/postController')
const { protect } = require('../middleware/authMiddleware')

// router.route allows additional methods to be chained on (i.e. get/post)
router.route('/').get(getPosts).post(protect, createPost)
router.route('/:id').get(getPost).delete(protect, deletePost).put(protect, updatePost)

module.exports = router;