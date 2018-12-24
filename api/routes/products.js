const express = require('express')
const router = express.Router()

const Product = require('./../models/products')


/**
 * Get all
 */
router.get('/', async (request, response) => {
    try {
        const docs = await Product.find().select('-__v')

        const products = docs.map(doc => {
            return {
                name: doc.name,
                price: doc.price,
                _id: doc._id,
                request: {
                    type: 'GET',
                    url: `http://localhost:3000/products/${doc._id}`
                }
            }
        })

        response.status(200).json({
            success: true,
            data: {
                message: 'Got all products',
                count: docs.length,
                products,
            }
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
router.post('/', async (request, response) => {
    const name = request.body.name
    const price = request.body.price

    try {
        const product = await Product.create({ name, price })

        response.status(201).json({
            success: true,
            data: {
                message: 'Product was created',
                name: product.name,
                price: product.price,
                _id: product._id,
                request: {
                    type: 'GET',
                    url: `http://localhost:3000/products/${product._id}`
                }
            }
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
router.get('/:productId', async (request, response) => {
    const id = request.params.productId

    try {
        const product = await Product.findById(id)
        
        response.status(200).json({
            success: true,
            data: {
                message: 'Get product',
                name: product.name,
                price: product.price,
                _id: product._id,
                request: {
                    type: 'GET',
                    url: `http://localhost:3000/products/${product._id}`
                }
            }
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
router.patch('/:productId', async (request, response) => {
    const id = request.params.productId
    const options = request.body
    const productOps = {}

    for (const ops in options) {
        productOps[ops] = options[ops]
    }

    try {
        const product = await Product.findByIdAndUpdate(id, {
            $set: {
                ...productOps
            },
        }, { new: true })

        if (!product) {
            return response.status(404).json({
                success: false,
                data: {
                    message: 'Not found'
                }
            })
        }

        response.status(200).json({
            success: true,
            data: {
                message: 'Product was updated',
                name: product.name,
                price: product.price,
                _id: product._id,
                request: {
                    type: 'GET',
                    url: `http://localhost:3000/products/${product._id}`
                }
            }
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
router.delete('/:productId', async (request, response) => {
    const id = request.params.productId

    try {
        const product = await Product.findByIdAndDelete(id)

        if (!product) {
            return response.status(404).json({
                success: false,
                data: {
                    message: 'Not found'
                }
            })
        }

        response.status(200).json({
            success: true,
            data: {
                message: 'Product was deleted',
                request: {
                    type: 'POST',
                    url: `http://localhost:3000/products`,
                    body: {
                        name: 'String',
                        price: 'Number'
                    }
                }
            }
        })
    } catch (error) {
        response.status(500).json({
            error
        })
    }
})


module.exports = router
