const express = require('express')
const router = express.Router()


router.get('/', (request, response, next) => {
    response.status(200).json({
        message: 'Get all orders',
    })
})

router.post('/', (request, response, next) => {
    const name = request.body.name

    response.status(201).json({
        message: 'Add order',
        name,
    })
})

router.get('/:orderId', (request, response, next) => {
    const id = request.params.orderId

    response.status(200).json({
        message: 'Get order',
        id,
    })
})

router.delete('/:orderId', (request, response, next) => {
    const id = request.params.orderId

    response.status(200).json({
        message: 'Delete order',
        id,
    })
})


module.exports = router
