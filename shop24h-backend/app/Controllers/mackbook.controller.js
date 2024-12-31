const mongoose = require('mongoose')
const macbookModel = require('../Model/macbook.model')


const postMacbook = (req, res) => {
    const { name, description, imageUrl, buyPrice, promotionPrice, amount } = req.body
    if (!name) {
        return res.status(400).json({
            status: 'Bad Request',
            message: 'Name is Require'
        })
    }

    if (!description) {
        return res.status(400).json({
            status: 'Bad Request',
            message: 'description is Require'
        })
    }

    if (!imageUrl) {
        return res.status(400).json({
            status: 'Bad Request',
            message: 'imageUrl is Require'
        })
    }

    if (!buyPrice) {
        return res.status(400).json({
            status: 'Bad Request',
            message: 'buyPrice is Require'
        })
    }

    if (!promotionPrice) {
        return res.status(400).json({
            status: 'Bad Request',
            message: 'promotionPrice is Require'
        })
    }

    if (!amount) {
        return res.status(400).json({
            status: 'Bad Request',
            message: 'amount is Require'
        })
    }

    let newMacbook = {
        _id: new mongoose.Types.ObjectId(),
        name, description, imageUrl, buyPrice, promotionPrice, amount
    }

    macbookModel.create(newMacbook)
        .then((data) => {
            return res.status(201).json({
                status: 'Create Data List Macbook SuccessFully',
                data
            })
        })
        .catch((error) => {
            return res.status(500).json({
                status: 'Internal Error Sever',
                message: error.message
            })
        })
}

const getAllMacbook = (req, res) => {
    macbookModel.find()
        .then((data) => {
            return res.status(200).json({
                status: 'Get All Data List Macbook',
                data
            })
        })
        .catch((error) => {
            return res.status(500).json({
                status: 'Internal Error Sever',
                message: error.message
            })
        })
}

const getByIDMacbook = (req, res) => {
    let IdProduct = req.params.macbookId
    if (!mongoose.Types.ObjectId.isValid(IdProduct)) {
        return res.status(400).json({
            status: 'Not Found ID',
            message: 'It is valid ID'
        })
    }

    macbookModel.findById(IdProduct)
        .then((data) => {
            if (data) {
                return res.status(200).json({
                    status: 'Get By ID Macbook',
                    data
                })
            } else {
                return res.status(400).json({
                    status: 'Bad request',
                    message: 'Not Found Any Macbook'
                })
            }
        })
        .catch((error) => {
            return res.status(500).json({
                status: 'Internal Error Sever',
                message: error.message
            })
        })
}

const updateByIdMacbook = (req, res) => {
    let IdMacbook = req.params.macbookId
    const { name, description, imageUrl, buyPrice, promotionPrice, amount } = req.body
    if (!mongoose.Types.ObjectId().isValid(IdMacbook)) {
        return res.status(400).json({
            status: 'Not Found ID',
            message: 'It is valid ID'
        })
    }

    if (!name) {
        return res.status(400).json({
            status: 'Bad request',
            message: 'Name is Required'
        })
    }

    if (!description) {
        return res.status(400).json({
            status: 'Bad request',
            message: 'description is Required'
        })
    }
    if (!imageUrl) {
        return res.status(400).json({
            status: 'Bad request',
            message: 'imageUrl is Required'
        })
    }
    if (!buyPrice) {
        return res.status(400).json({
            status: 'Bad request',
            message: 'buyPrice is Required'
        })
    }
    if (!promotionPrice) {
        return res.status(400).json({
            status: 'Bad request',
            message: 'promotionPrice is Required'
        })
    }

    if (!amount) {
        return res.status(400).json({
            status: 'Bad request',
            message: 'amount is Required'
        })
    }

    let update = {
        name,
        description,
        imageUrl,
        buyPrice,
        promotionPrice,
        amount
    }

    macbookModel.findByIdAndUpdate(IdMacbook, update)
        .then((data) => {
            if (data) {
                return res.status(200).json({
                    status: 'Update Macbook By ID Successfully',
                    data
                })
            }
        }).catch((error) => {
            return res.status(500).json({
                status: 'Intetnal Error Sever',
                message: error.message
            })
        })
}

const deleteMacbook = (req, res) => {
    let IdMacbook = req.params.macbookId
    if (mongoose.Types.ObjectId(IdMacbook).isValid()) {
        return res.status(400).json({
            status: 'Not Found ID Iphone',
            message: 'It is a valid ID'
        })
    }

    macbookModel.findByIdAndDelete(IdMacbook)
        .then((data) => {
            if (data) {
                return res.status(204).json({
                    status: 'Delete By ID Iphone Successfully',
                    data
                })
            } else {
                return res.status(400).json({
                    status: 'Not Found Any Iphone',
                    data
                })
            }
        })
        .catch((error) => {
            return res.status(500).json({
                status: 'Internal Error Sever',
                message: error.message
            })
        })
}

module.exports = { postMacbook, getAllMacbook, getByIDMacbook, updateByIdMacbook, deleteMacbook }