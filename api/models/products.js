const { model, Schema} = require('mongoose')


const productSchema = new Schema({
    name: String,
    price: Number
})


module.exports = model('Product', productSchema)
