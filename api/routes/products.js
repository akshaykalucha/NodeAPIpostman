const express = require('express');
const router = express.Router();

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