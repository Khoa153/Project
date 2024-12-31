const express = require('express')
const routesPagiNation = express.Router()
const product = require('../Model/product.model')

// routesPagiNation.get('/pagination', (req, res) => {
//     const { page, limit } = req.query

//     const promise = product
//         .find()
//         .skip((page) * limit)
//         .limit(limit)

//     promise
//         .then((data) => {
//             return res.status(200).json({
//                 data,
//             })
//         })
//         .catch((error) => {
//             return res.status(500).json({
//                 message: 'Internal Server Error',
//                 error: error.message,
//             })
//         })
// })

routesPagiNation.get('/pagination', async (req, res) => {
    const { page, limit } = req.query
    try {
        const pagiProduct = await product.find()
            .skip((page - 1) * limit)
            .limit(limit)
        return res.status(200).json(pagiProduct)
    } catch (error) {
        return res.status(500).json({
            message: 'Error Internal Sever',
            error: error.message
        })
    }
})

module.exports = routesPagiNation