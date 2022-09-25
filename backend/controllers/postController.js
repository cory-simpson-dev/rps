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

// @desc    Get user post
// @route   GET /api/posts/:id
// @access  Public
const getPost = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id)
  
    if(!post) {
        res.status(404)
        throw new Error('Post not found')
    }
  
    res.status(200).json(post)
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
  
// @desc    Delete post
// @route   DELETE /api/posts/:id
// @access  Private
const deletePost = asyncHandler(async (req, res) => {
    // Get user using the id in the JWT
    const user = await User.findById(req.user.id)
  
    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }
  
    const post = await Post.findById(req.params.id)
  
    if(!post) {
        res.status(404)
        throw new Error('Post not found')
    }
  
    if(post.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Not Authorized')
    }
  
    // removes post from db
    await post.remove()
  
    res.status(200).json({success: true})
})
  
// @desc    Update post
// @route   PUT /api/posts/:id
// @access  Private
const updatePost = asyncHandler(async (req, res) => {
    // Get user using the id in the JWT
    const user = await User.findById(req.user.id)
  
    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }
  
    const post = await Post.findById(req.params.id)
  
    if(!post) {
        res.status(404)
        throw new Error('Post not found')
    }
  
    if(post.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Not Authorized')
    }
  
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true })
  
    res.status(200).json(updatedPost)
})

module.exports = {
    getPosts,
    getPost,
    createPost,
    deletePost,
    updatePost
}