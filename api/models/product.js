const mongoose = require('mongoose')


var Schema = mongoose.Schema

const productSchema = Schema({
    name: String,
    price: Number,
    quantity: Number
  });

const Product = mongoose.model('Product', productSchema);


module.exports = Product;