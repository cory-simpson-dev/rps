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
    const {title, body} = req.body

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
        body,
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

// @desc    Upvote post
// @route   PUT /api/posts/upvotePost/:id
// @access  Private
const handleUpvote = asyncHandler(async (req, res) => {
    // Get user using the id in the JWT
    const user = await User.findById(req.user.id)
    
    // user must be logged in
    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }
    
    const post = await Post.findById(req.params.id)
    
    if(!post) {
        res.status(404)
        throw new Error('Post not found')
    }

    let handledPost

    // if post upvotedBy user already, remove user from post.upvotedBy
    if (post.upvotedBy.indexOf(req.user.id) > -1) {
        handledPost = await Post.findByIdAndUpdate(req.params.id, 
            {
                $pull: {'upvotedBy': req.user.id},
            }, { new: true }
        )
    // if post previously downvoted by user, remove from down votes && add to upvotes
    } else if (post.downvotedBy.indexOf(req.user.id) > -1) {
        handledPost = await Post.findByIdAndUpdate(req.params.id, 
            {
                $pull: {'downvotedBy': req.user.id},
                $push: {'upvotedBy': req.user.id},
            }, { new: true }
        )
    // otherwise, add user to upvotedBy
    } else {
        handledPost = await Post.findByIdAndUpdate(req.params.id, 
            {
                $push: {'upvotedBy': req.user.id},
            }, { new: true })
    }

    res.status(200).json(handledPost)
})

// @desc    Downvote post
// @route   PUT /api/posts/downvotePost/:id
// @access  Private
const handleDownvote = asyncHandler(async (req, res) => {
    // Get user using the id in the JWT
    const user = await User.findById(req.user.id)
    
    // user must be logged in
    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }
    
    const post = await Post.findById(req.params.id)
    
    if(!post) {
        res.status(404)
        throw new Error('Post not found')
    }

    let handledPost

    // if post downvotedBy user already, remove user from post.downvotedBy
    if (post.downvotedBy.indexOf(req.user.id) > -1) {
        handledPost = await Post.findByIdAndUpdate(req.params.id, 
            {
                $pull: {'downvotedBy': req.user.id},
            }, { new: true }
        )
    // if post previously upvoted by user, remove from up votes && add to downvotes
    } else if (post.upvotedBy.indexOf(req.user.id) > -1) {
        handledPost = await Post.findByIdAndUpdate(req.params.id, 
            {
                $pull: {'upvotedBy': req.user.id},
                $push: {'downvotedBy': req.user.id},
            }, { new: true }
        )
    // otherwise, add user to downvotedBy
    } else {
        handledPost = await Post.findByIdAndUpdate(req.params.id, 
            {
                $push: {'downvotedBy': req.user.id},
            }, { new: true })
    }

    res.status(200).json(handledPost)
})

module.exports = {
    getPosts,
    getPost,
    createPost,
    deletePost,
    updatePost,
    handleUpvote,
    handleDownvote
}