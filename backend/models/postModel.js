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
    image: {
        type: String,
        required: true,
        required: [true, 'Please add an image'],
        default: 'pending front-end ui',
    },
    cloudinaryId: {
        type: String,
        required: true,
        default: 'pending front-end ui',
    },
    body: {
        type: String,
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