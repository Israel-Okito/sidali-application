const express = require('express')
const userController = require('../controller/user')
const protect = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/add-user', userController.addUser)
router.get('/users',protect, userController.getUsers )
router.post('/login', userController.login )

module.exports = router