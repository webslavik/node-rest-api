const express = require('express')
const router = express.Router()

const Orders = require('./../models/orders')
const Products = require('./../models/products')


/**
 * Get all
 */
router.get('/', async (request, response) => {
    try {
        const docs = await Orders.find().select('-__v')

        const orders = docs.map(doc => {
            return {
                _id: doc._id,
                product: doc.product,
                quantity: doc.quantity,
                request: {
                    type: 'GET',
                    url: `http://localhost:3000/orders/${doc._id}`
                }
            }
        })

        response.status(200).json({
            success: true,
            data: {
                message: 'Got all orders',
                count: orders.length,
                orders,
            }
        })
    } catch (error) {
        response.status(500).json({
            message: 'Some error',
            error
        })
    }
})

/**
 * Create
 */
router.post('/', async (request, response) => {
    const productId = request.body.productId
    const quantity = request.body.quantity

    try {
        const product = await Products.findById(productId)

        if (!product) {
            return response.status(404).json({
                success: false,
                data: {
                    message: `Product not found`
                }
            })
        }

        const order = await Orders.create({ product: productId, quantity })

        response.status(201).json({
            success: true,
            data: {
                message: 'Order was created',
                product: order.product,
                quantity: order.quantity,
                _id: product._id,
                request: {
                    type: 'GET',
                    url: `http://localhost:3000/orders/${order._id}`
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
 * Get an order
 */
router.get('/:orderId', async (request, response) => {
    const orderId = request.params.orderId
    
    try {
        const order = await Orders.findById(orderId)
        
        if (!order) {
            return response.status(404).json({
                success: false,
                data: {
                    message: 'Order not found'
                }
            })
        }

        response.status(200).json({
            success: true,
            data: {
                message: 'Get order',
                product: order.product,
                quantity: order.quantity,
                _id: order._id,
                request: {
                    type: 'GET',
                    url: `http://localhost:3000/products`
                }
            }
        })
    } catch (error) {
        response.status(500).json({
            error
        })
    }
})

router.delete('/:orderId', async (request, response) => {
    const orderId = request.params.orderId

    try {
        const order = await Orders.findByIdAndDelete(orderId)
        
        if (!order) {
            return response.status(404).json({
                success: false,
                data: {
                    message: 'Order not found'
                }
            })
        }

        response.status(200).json({
            success: true,
            data: {
                message: 'Order was deleted',
                request: {
                    type: 'POST',
                    url: `http://localhost:3000/orders`,
                    body: {
                        product: 'ID',
                        quantity: 'Number'
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
