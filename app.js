const express = require('express')

const app = express()

app.get('/', (request, response, next) => {
    response
        .status(200)
        .json({ message: 'Hello bitch' })
})


module.exports = app
