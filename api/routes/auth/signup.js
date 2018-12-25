const express = require('express')
const router = express.Router()

const SignupController = require('./../../controllers/auth/signup.controller')

router.post('/', SignupController.signup)

module.exports = router
