const express = require('express')
const multer = require('multer')

const Product = require('./../models/products')
const router = express.Router()

// Multer settings
const storage = multer.diskStorage({
    destination(request, file, callback) {
        callback(null, './uploads/')
    },
    filename(request, file, callback) {
        callback(null, `${new Date().toISOString()}-${file.originalname}`)
    }
})

const fileFilter = (request, file, callback) => {
    if (file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/png') {
        callback(null, true)
        return
    } 

    callback(null, false)
}

const upload = multer({ 
    storage,
    fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
})


/**
 * Get all
 */
router.get('/', async (request, response) => {
    try {
        const docs = await Product.find().select('-__v')

        const products = docs.map(doc => {
            return {
                _id: doc._id,
                name: doc.name,
                price: doc.price,
                image: doc.image,
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
router.post('/', upload.single('productImage'), async (request, response) => {
    const name = request.body.name
    const price = request.body.price
    const image = request.file.path
    

    try {
        const product = await Product.create({ name, price, image })

        response.status(201).json({
            success: true,
            data: {
                message: 'Product was created',
                name: product.name,
                price: product.price,
                image: product.image,
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
                product: {
                    _id: product._id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    request: {
                        type: 'GET',
                        url: `http://localhost:3000/products/${product._id}`
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
                product: {
                    _id: product._id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    request: {
                        type: 'GET',
                        url: `http://localhost:3000/products/${product._id}`
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
