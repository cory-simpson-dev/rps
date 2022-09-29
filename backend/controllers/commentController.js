const asyncHandler = require('express-async-handler')

const Post = require('../models/postModel')
const Comment = require('../models/commentModel')

// NOTE: no need to get the user, we already have them on req object from
// protect middleware. The protect middleware already checks for valid user.

// @desc    Get comments for a post
// @route   GET /api/posts/:postId/comments
// @access  Public
const getComments = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.postId)

    if (!post) {
        res.status(404)
        throw new Error('Post not found')
    }

    const comments = await Comment.find({post: req.params.postId})
    res.status(200).json(comments)
})

// @desc    Create post comment
// @route   POST /api/posts/:postId/comments
// @access  Private
const addComment = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.postId)
   
    const comment = await Comment.create({
      text: req.body.text,
      post: req.params.postId,
      user: req.user.id,
    })
  
    res.status(200).json(comment)
  })

module.exports = {
    getComments,
    addComment,
}