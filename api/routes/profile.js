const express = require('express')
const router = express.Router()

const Authenticate = require('./../middleware/authenticate')
const UserController = require('./../controllers/user.controller')

router.delete('/delete-user/:userId', Authenticate, UserController.deleteUser)

module.exports = router
