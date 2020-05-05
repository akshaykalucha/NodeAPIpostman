const express = require('express');
const router = express.Router();

const mongoose = require('mongoose')
const Product = require('../models/product')

router.get('/', (req, res, next) => {
     res.status(200).json({
        message: "handling from product.js"
    })
}) 

router.post('/', (req, res, next) => {
    console.log('yes')
    const productl = {
        name: req.body.name,
        price: req.body.price
    }
// const Product = require('../models/product')
// const mongoose = require('mongoose')
// const db = require('E:\\CodingProjects\\NodeAPIpostman\\keys.js').MongoURI

router.get('/', async (req, res, next) => {

    try{
        const things = await Product.find().exec();
        res.json(things)
    }catch(err) {
        res.json({message: err})
        console.log(err)
    }
}) 

router.post('/', (req, res, next) => {

    console.log('yes')
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity,
    })

    product.save(function(error) {
        console.log("Your product has been saved!");
    if (error) {
        console.error(error);
     }
    });


    console.log(productl)
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    })
    console.log(product)
    product.save().then(result => {
        console.log(res)
    })
    .catch(err=>console.log(err));

    res.status(200).json({
        message: "handling post from product.js",
        createdProduct: product
    })
})

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id).exec().then(doc=>{console.log(doc);
        res.status(200).json(doc)
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            "Type": "Error",
            "data": err
        })
    })

})

router.patch('/:productId', async (req, res, next) => {
    try{
        console.log(req.params.productId)
        const updatedproduct = await Product.updateOne({_id: req.params.productId}, {$set:{
            name: req.body.name,
            // price: req.body.price,
            // quantity: req.body.quantity
        }})
        res.status(200).json({
            message: updatedproduct
        })
    }catch(err){
        res.json({
            message: err
        })
    }

})

router.delete('/:productId', async (req, res, next) => {

    try{
        const removeProduct = await Product.remove({_id: req.params.productId})
        res.status(200).json({
            message: removeProduct
        })
    }catch(err){
        res.json({message:err})
    }

})

module.exports = router;