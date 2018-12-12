const express = require('express')
const router = express.Router()


router.get('/', (request, response, next) => {
    response.status(200).json({
        message: 'GET request to /products'
    })
})

router.post('/', (request, response, next) => {
    const product = {
        name: request.body.name,
        price: request.body.price,
    }

    response.status(201).json({
        message: 'POST request to /products',
        product,
    })
})

router.get('/:productId', (request, response, next) => {
    const id = request.params.productId

    response.status(200).json({
        message: 'Get product',
        id,
    })
})

router.patch('/:productId', (request, response, next) => {
    response.status(200).json({
        message: 'Update product',
    })
})

router.delete('/:productId', (request, response, next) => {
    response.status(200).json({
        message: 'Delete product',
    })
})


module.exports = router
