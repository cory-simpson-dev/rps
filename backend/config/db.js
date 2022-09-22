const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        // mongoose provides connection & host properties
        // colors provides cyan & underline properties for reading in the console
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
    } catch (err) {
        console.log(`Error: ${error.message}`.red.underline.bold);
        process.exit(1)
    }
}

module.exports = connectDB