const Product = require('../models/products')


class ProductController {
    async getProducts(request, response) {
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
    }

    async addProduct(request, response) {
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
    }

    async getProduct(request, response) {
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
    }

    async updateProduct(request, response) {
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
    }

    async deleteProduct(request, response) {
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
    }
}

module.exports = new ProductController()
