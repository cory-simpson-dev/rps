const mongoose = require('mongoose')

const threadSchema = mongoose.Schema({
    users: [{
        type: String,
        required: true,
    }],
    messages: [{
        sender: {
            type: String,
            required: true,
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