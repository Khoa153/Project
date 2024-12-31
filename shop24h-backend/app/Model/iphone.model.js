const mongoose = require('mongoose')
const Schema = mongoose.Schema
const iphoneSchema = new Schema({
    _id: mongoose.Types.ObjectId,
    name: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String,
    },
    imageUrl: {
        type: String,
        required: true
    },
    buyPrice: {
        type: Number,
        required: true,
    },
    promotionPrice: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        default: 0,
        required: true
    },
})

module.exports = mongoose.model('iphone', iphoneSchema)