const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Post',
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    username: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: [true, 'Please add a comment'],
        default: 'test body',
    },
    upvotedBy: {
        type: Array,
    },
    downvotedBy: {
        type: Array,
    },
    isStaff: {
        type: Boolean,
        default: false,
    }
},{
    timestamps: true,
})

module.exports = mongoose.model('Comment', commentSchema)