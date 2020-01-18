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

router.patch('/:productId', (req, res, next) => {
    res.status(200).json({
        message: "updated product"
    })
})

router.delete('/:productId', (req, res, next) => {
    res.status(200).json({
        message: "deleted product"
    })
})

module.exports = router;