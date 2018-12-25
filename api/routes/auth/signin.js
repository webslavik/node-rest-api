const express = require('express')
const router = express.Router()

const SigninController = require('./../../controllers/auth/signin.controller')


router.post('/', SigninController.signin)

module.exports = router
