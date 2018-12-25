const express = require('express')
const multer = require('multer')

const router = express.Router()
const Authenticate = require('./../middleware/authenticate')
const ProductController = require('../controllers/product.controller')


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
router.get('/', Authenticate, ProductController.getProducts)

/**
 * Add
 */
router.post('/', Authenticate, upload.single('productImage'), ProductController.addProduct)

/**
 * Get one
 */
router.get('/:productId', Authenticate, ProductController.getProduct)

/**
 * Update
 */
router.patch('/:productId', Authenticate, ProductController.updateProduct)

/**
 * Delete
 */
router.delete('/:productId', Authenticate, ProductController.deleteProduct)

module.exports = router
