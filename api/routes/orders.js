const express = require('express')
const router = express.Router()

const Authenticate = require('./../middleware/authenticate')
const OrderController = require('./../controllers/orders.controller')


/**
 * Get all
 */
router.get('/', Authenticate, OrderController.getOrders)

/**
 * Add
 */
router.post('/', Authenticate, OrderController.addOrder)

/**
 * Get an order
 */
router.get('/:orderId', Authenticate, OrderController.getOrder)

/**
 * Delete
 */
router.delete('/:orderId', Authenticate, OrderController.deleteOrder)

module.exports = router
