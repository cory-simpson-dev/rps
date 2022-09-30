const mongoose = require('mongoose')

const threadSchema = mongoose.Schema({
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }],
    messages: [{
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        text: {
            type: String,
            required: [true, 'Please add a message'],
        },
        recipientReadStatus: {
            type: Boolean,
            default: false
        },
        sentAt: {
            type: Date,
        }
    }]
},{
    timestamps: true,
})

module.exports = mongoose.model('Thread', threadSchema)