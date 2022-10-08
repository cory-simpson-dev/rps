const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    username: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: [true, 'Please add a title'],
    },
    body: {
        type: String,
        default: 'test body',
    },
    upvotedBy: {
        type: Array,
    },
    downvotedBy: {
        type: Array,
    },
},{
    timestamps: true,
})

module.exports = mongoose.model('Post', postSchema)