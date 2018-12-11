const express = require('express')
const morgan = require('morgan')

const app = express()

app.use(morgan('dev'))


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
