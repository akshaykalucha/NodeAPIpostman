const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "orders.were fetched"
    })
})

router.post('/', (req, res, next) => {
    const order = {
        product: req.body.productId,
        quantity: req.body.quantity
    }
    res.status(201).json({
        message: "orders were created",
        order: order
    })
})

router.get('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: "order detail"
    })
})

router.delete('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: "order deleted"
    })
})

module.exports = router