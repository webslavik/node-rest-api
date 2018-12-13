const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')

const app = express()

// Data Base
mongoose
    .connect('mongodb://localhost:27017/restAPI', { useNewUrlParser: true })
    .then(() => {
        console.log('Connection to DB is successful.')
    })
    .catch((error) => {
        console.log(`Can't connect to DB: ${error}`)
    })
    

// middleware
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// CORS
app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Headers', 
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    )

    if (request.method === 'OPTIONS') {
        response.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
        return  response.status(200).json({})
    }

    next()
})


// Routes
const productsRoutes = require('./api/routes/products')
const ordersRoutes = require('./api/routes/orders')

app.use('/products', productsRoutes)
app.use('/orders', ordersRoutes)


// Handling errors
app.use((request, response, next) => {
    const error = new Error('Not found')
    error.status = 404
    next(error)
})

app.use((error, request, response, next) => {
    response.status(error.status || 500)
    response.json({
        error: {
            message: error.message,
        }
    })
})

module.exports = app
