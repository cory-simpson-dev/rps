// commonjs syntax (as opposed to React's ES2015 syntax (import))
const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const PORT = process.env.PORT || 5000
const connectDB = require('./config/db')
const app = express()

// connect to database
connectDB()

// middleware
// allows to send raw json
app.use(express.json())
// allows to send urlencoded
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.status(200).json({message: 'Welcome to the Support Desk API'})
})

// Routes
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/posts', require('./routes/postRoutes'))
app.use('/api/messaging', require('./routes/messageRoutes'))

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))