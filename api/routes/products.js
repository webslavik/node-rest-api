const express = require('express')
const router = express.Router()

const Product = require('./../models/products')


/**
 * Get all
 */
router.get('/', async (request, response, next) => {
    try {
        const result = await Product.find()

        response.status(200).json({
            result
        })
    } catch (error) {
        response.status(500).json({
            error
        })
    }
})

/**
 * Add
 */
router.post('/', async (request, response, next) => {
    const product = new Product({
        name: request.body.name,
        price: request.body.price
    })

    try {
        const result = await product.save()

        response.status(201).json({
            message: 'POST request to /products',
            result,
        })
    } catch (error) {
        response.status(500).json({
            message: 'POST request to /products',
            error
        })
    }
})

/**
 * Get one
 */
router.get('/:productId', async (request, response, next) => {
    const id = request.params.productId

    try {
        const result = await Product.findById(id)
        
        response.status(200).json({
            result
        })
    } catch (error) {
        response.status(500).json({
            error
        })
    }
})

/**
 * Update
 */
router.patch('/:productId', async (request, response, next) => {
    const id = request.params.productId
    const options = request.body
    const productOps = {}

    for (const ops in options) {
        productOps[ops] = options[ops]
    }

    try {
        const result = await Product.findByIdAndUpdate(id, {
            $set: {
                ...productOps
            },
        }, { new: true })

        if (!result) {
            return response.status(404).json({
                success: false,
                data: {
                    message: 'Not found'
                }
            })
        }

        response.status(200).json({
            result
        })
    } catch (error) {
        response.status(500).json({
            error
        })
    }
})

/**
 * Delete
 */
router.delete('/:productId', async (request, response, next) => {
    const id = request.params.productId

    try {
        const result = await Product.findByIdAndDelete(id)

        response.status(200).json({
            result
        })
    } catch (error) {
        response.status(200).json({
            error
        })
    }
})


module.exports = router
