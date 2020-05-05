const mongoose = require('mongoose')


var Schema = mongoose.Schema
const productSchema = Schema({
    name: String,
    price: Number,
    quantity: Number
  });
// const{Pool,Client} = require('pg')
// const connectionString = 'postgresql://postgres:akshay123@localhost:5432/shop'

// const pool = new Pool({
//     connectionString:connectionString
// })

// pool.query("CREATE TABLE products (id INT, name VARCHAR)",(err,res)=>{
//     console.log(err,res)
//     pool.end()
// })

const mongoose = require('mongoose')

// const productSchema = mongoose.Schema({
//     _id: mongoose.Schema.Types.ObjectId,
//     name: String,
//     price: Number
// })

const productSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

const Product = mongoose.model('Product', productSchema);


module.exports = Product;