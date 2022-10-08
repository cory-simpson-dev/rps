const asyncHandler = require('express-async-handler')

const Thread = require('../models/threadModel')
const User = require('../models/userModel')

// NOTE: no need to get the user, we already have them on req object from
// protect middleware. The protect middleware already checks for valid user.

// @desc    Get this users threads
// @route   GET /api/messaging/
// @access  Private
const getThreads = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id)

    const threads = await Thread.find({
        users: user.username
    }).sort({'updatedAt': -1})

    if (!threads) {
        res.status(200).json('No threads at this time')
    }

    res.status(200).json(threads)
})

// @desc    Create thread
// @route   POST /api/messaging/new
// @access  Private
const createThread = asyncHandler(async (req, res) => {
    const recipientUsername = req.body.recipient
    // find recipient
    const recipient = await User.findOne({username: recipientUsername})
    // find user
    const user = await User.findById(req.user.id)

    if (!recipient) {
        res.status(400)
        throw new Error('Recipient not found')
    }

    // catch if recipient is same as sender
    if (user.username === recipient.username) {
        res.status(400)
        throw new Error('Invalid recipient')
    }

    // catch if thread with these users already exists
    const existingThread = await Thread.find({
        users: { $all: [recipient.username, user.username]}
    })

    if (existingThread.length > 0) {
        res.status(400)
        throw new Error('Thread with these users already exists')
    }

    const thread = await Thread.create({
        users: [user.username, recipient.username],
        messages: [{
            sender: user.username,
            text: req.body.text,
            sentAt: new Date(),
        }]
    })

    res.status(201).json(thread)
})

// @desc    Update thread with new message
// @route   GET /api/messaging/threads/:threadId
// @access  Private
const getThread = asyncHandler(async (req, res) => {
    const thread = await Thread.findById(req.params.threadId)
    const user = await User.findById(req.user.id)
        
    if(!thread.users.includes(user.username)) {
        res.status(401)
        throw new Error('Not Authorized')
    }
    
    if(!thread) {
        res.status(404)
        throw new Error('Thread not found')
    }

    res.status(200).json(thread)
})

// @desc    Update thread with new message
// @route   PUT /api/messaging/threads/:threadId
// @access  Private
const addMessage = asyncHandler(async (req, res) => {
    const thread = await Thread.findById(req.params.threadId)
    const user = await User.findById(req.user.id)

    if(!thread) {
        res.status(404)
        throw new Error('Thread not found')
    }
    
    const text = req.body.text

    if(!text) {
        res.status(400)
        throw new Error('Please add text')
    }

    const updatedThread = await Thread.findByIdAndUpdate(req.params.threadId, 
        {
            $push: {'messages': {
                sender: user.username,
                text: req.body.text,
                recipientReadStatus: false,
                sentAt: new Date(),
            }},
        }, { new: true })

    res.status(201).json(updatedThread)
})

module.exports = {
    getThreads,
    createThread,
    getThread,
    addMessage,
}