const express = require("express");
const router = express.Router();
const { getThreads, createThread, getThread, addMessage} = require('../controllers/messageController')
const { protect } = require('../middleware/authMiddleware')

// router.route allows additional methods to be chained on (i.e. get/post)
// route /api/messaging
router.route('/').get(protect, getThreads)
router.route('/new').post(protect, createThread)
router.route('/threads/:threadId').get(protect, getThread).put(protect, addMessage)

module.exports = router;