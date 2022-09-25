const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Post = require('../models/postModel')

// @desc    Get user posts
// @route   GET /api/posts
// @access  Public
const getPosts = asyncHandler(async (req, res) => {
    res.status(200).json({message: 'getPosts'})
})

// @desc    Create new post
// @route   POST /api/posts
// @access  Private
const createPost = asyncHandler(async (req, res) => {
    res.status(200).json({message: 'createPost'})
})
  
module.exports = {
    getPosts,
    createPost
}