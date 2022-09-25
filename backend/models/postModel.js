const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: [true, 'Please add a title'],
    },
    body: {
        type: String,
        default: 'test body',
    },
    upvotes: {
        type: Number,
        required: true,
        default: 0,
    },
    downvotes: {
        type: Number,
        required: true,
        default: 0,
    },
},{
    timestamps: true,
})

module.exports = mongoose.model('Post', postSchema)