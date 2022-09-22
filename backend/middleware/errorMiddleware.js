// custom error handler - can include anything we prefer

const errorHandler = (err, req, res, next) => {
    // if statusCode is present as res.status(), use it otherwise use 500
    const statusCode = res.statusCode ? res.statusCode : 500
    res.status(statusCode)
    res.json({
        message: err.message,
        // only show stack if not in  production mode
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}

module.exports = { errorHandler }