// schema - all fields we want for users
const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please add a username'],
        unique: true
    },
    lowerCaseUsername: {
        type: String,
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please add a password']
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }
},
{
    timestamps: true,
})

module.exports = mongoose.model('User', userSchema)