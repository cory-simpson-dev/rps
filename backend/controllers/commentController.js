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

    const comments = await Comment.find({post: req.params.postId}).sort({'createdAt': -1})
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

// @desc    Upvote comment
// @route   PUT /api/posts/:postId/comments/upvoteComment/:commentId
// @access  Private
const handleCommentUpvote = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.postId)

  if(!post) {
      res.status(404)
      throw new Error('Post not found')
  }

  const comment = await Comment.findById(req.params.commentId)

  if(!comment) {
      res.status(404)
      throw new Error('Comment not found')
  }

  let handledComment

  // if comment upvotedBy user already, remove user from comment.upvotedBy
  if (comment.upvotedBy.indexOf(req.user.id) > -1) {
      handledComment = await Comment.findByIdAndUpdate(req.params.commentId, 
          {
              $pull: {'upvotedBy': req.user.id}
          }, { new: true }
      )
  // if comment previously downvoted by user, remove from down votes && add to upvotes
  } else if (comment.downvotedBy.indexOf(req.user.id) > -1) {
      handledComment = await Comment.findByIdAndUpdate(req.params.commentId, 
          {
              $pull: {'downvotedBy': req.user.id},
              $push: {'upvotedBy': req.user.id}
          }, { new: true }
      )
  // otherwise, add user to upvotedBy
  } else {
      handledComment = await Comment.findByIdAndUpdate(req.params.commentId, 
          {
              $push: {'upvotedBy': req.user.id}
          }, { new: true })
  }

  res.status(200).json(handledComment)
})

// @desc    Downvote comment
// @route   PUT /api/posts/:postId/comments/downvoteComment/:commentId
// @access  Private
const handleCommentDownvote = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.postId)

  if(!post) {
      res.status(404)
      throw new Error('Post not found')
  }

  const comment = await Comment.findById(req.params.commentId)

  if(!comment) {
      res.status(404)
      throw new Error('Comment not found')
  }

  let handledComment

  // if comment downvotedBy user already, remove user from comment.downvotedBy
  if (comment.downvotedBy.indexOf(req.user.id) > -1) {
      handledComment = await Comment.findByIdAndUpdate(req.params.commentId, 
          {
              $pull: {'downvotedBy': req.user.id}
          }, { new: true }
      )
  // if post previously upvoted by user, remove from up votes && add to downvotes
  } else if (comment.upvotedBy.indexOf(req.user.id) > -1) {
      handledComment = await Comment.findByIdAndUpdate(req.params.commentId, 
          {
              $pull: {'upvotedBy': req.user.id},
              $push: {'downvotedBy': req.user.id}
          }, { new: true }
      )
  // otherwise, add user to downvotedBy
  } else {
      handledComment = await Comment.findByIdAndUpdate(req.params.commentId, 
          {
              $push: {'downvotedBy': req.user.id}
          }, { new: true })
  }

  res.status(200).json(handledComment)
})

module.exports = {
    getComments,
    addComment,
    handleCommentUpvote,
    handleCommentDownvote,
}