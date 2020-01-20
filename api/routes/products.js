const express = require('express');
const router = express.Router();
<<<<<<< Updated upstream

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "handling from product.js"
    })
}) 

router.post('/', (req, res, next) => {
    const product = {
        name: req.body.name,
        price: req.body.price
    }
=======
const Product = require('../models/product')
const mongoose = require('mongoose')
const db = require('E:\\CodingProjects\\NodeAPIpostman\\keys.js').MongoURI

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


>>>>>>> Stashed changes
    res.status(200).json({
        message: "handling post from product.js",
        createdProduct: product
    })
})

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    if(id === 'special'){
        res.status(200).json({
            "message": "hellnyeah",
            id: id
        })
    } else{
        res.status(200).json({
            "message": "Not hell yeah"
        })
    }
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