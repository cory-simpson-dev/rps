const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/userModel')
const Post = require('../models/postModel')

// @desc    Register a new user
// @route   /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const {username, email, password} = req.body

    // Validation
    if(!username || !email || !password) {
        res.status(400)
        throw new Error('Please include all fields')
    }

    // Find if user already exists
    const usernameExists = await User.findOne({username})
    
    if(usernameExists) {
        res.status(400)
        throw new Error('That username is already taken')
    }

    const userEmailExists = await User.findOne({email})

    if(userEmailExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user
    const user = await User.create({
        username,
        email,
        password: hashedPassword
    })

    // if user was created,
    if(user) {
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new error('Invalid user data')
    }
})

// @desc    Register a new user
// @route   /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body

    const user = await User.findOne({email})

    // if user is found, verify password === bcrypt.compare password from db
    if(user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error('Invalid credentials')
    }

})

// @desc    Get current user
// @route   /api/users/:username
// @access  Public
const getUser = asyncHandler(async (req, res) => {
    const user = await User.findOne({username: req.params.username})

    if(!user) {
        res.status(404)
        throw new Error('User not found')
    }

    const userPosts = await Post.find({user: user._id}).sort({'createdAt': -1})

    res.status(200).json(userPosts)
})

// Generate token
// this token has user id within it (encoded)
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

module.exports = {
    registerUser,
    loginUser,
    getUser
}