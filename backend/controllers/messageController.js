const asyncHandler = require('express-async-handler')
const { restart } = require('nodemon')

const Thread = require('../models/threadModel')

// NOTE: no need to get the user, we already have them on req object from
// protect middleware. The protect middleware already checks for valid user.

// @desc    Get this users threads
// @route   GET /api/messaging/
// @access  Private
const getThreads = asyncHandler(async (req, res) => {
    const threads = await Thread.find({
        users: req.user.id
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
    // catch if recipient is same as sender
    if (req.user.id === req.body.recipient) {
        res.status(400)
        throw new Error('Invalid recipient')
    }

    // catch if thread with these users already exists
    const existingThread = await Thread.find({
        users: { $all: [req.user.id, req.body.recipient]}
    })

    if (existingThread.length > 0) {
        res.status(400)
        throw new Error('Thread with these users already exists')
    }

    const thread = await Thread.create({
        users: [req.user.id, req.body.recipient],
        messages: [{
            sender: req.user.id,
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
    
    if(!thread.users.includes(req.user.id)) {
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
                sender: req.user.id,
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