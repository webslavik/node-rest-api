const { model, Schema} = require('mongoose')


const orderSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Product'
    },
    quantity: {
        type: Number,
        default: 1
    }
})


module.exports = model('Order', orderSchema)
