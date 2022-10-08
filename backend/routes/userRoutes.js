const express = require('express')
const router = express.Router()
const { registerUser, loginUser, getUser } = require('../controllers/userController')

// insert protect as second argument for any private route]
const { protect } = require('../middleware/authMiddleware')

router.post('/', registerUser)

router.post('/login', loginUser)

router.get('/:username', getUser)

module.exports = router