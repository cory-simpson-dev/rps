const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Post = require('../models/postModel')

// @desc    Get user posts
// @route   GET /api/posts
// @access  Public
const getPosts = asyncHandler(async (req, res) => {
    const posts = await Post.find().sort({'createdAt': -1}).limit(20)

    res.status(200).json(posts)
})

// @desc    Create new post
// @route   POST /api/posts
// @access  Private
const createPost = asyncHandler(async (req, res) => {
    const {title} = req.body

    if(!title) {
        res.status(400)
        throw new Error('Please add a title')
    }

    // Get user using the id in the JWT
    const user = await User.findById(req.user.id)

    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const post = await Post.create({
        title,
        user: req.user.id,
    })

    res.status(201).json(post)
})
  
module.exports = {
    getPosts,
    createPost
}