const mongoose = require('mongoose')
const iphoneModel = require('../Model/iphone.model')


const postIphone = (req, res) => {
    const { name, description, imageUrl, buyPrice, promotionPrice, amount } = req.body
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

    let newData = {
        _id: new mongoose.Types.ObjectId(),
        name,
        description,
        imageUrl,
        buyPrice,
        promotionPrice,
        amount
    }

    iphoneModel.create(newData)
        .then((data) => {
            return res.status(201).json({
                message: 'SuccessFully Create 1 Product In Data List Iphone',
                data
            })
        })
        .catch((error) => {
            return res.status(500).json({
                message: 'Internal Error Sever',
                message: error.message
            })
        })
}

const getAllIphone = (req, res) => {
    iphoneModel.find()
        .then((data) => {
            return res.status(200).json({
                status: 'Successfully Get All Data List Iphone',
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

const getByIDIphone = (req, res) => {
    let IdProduct = req.params.iphoneId
    if (!mongoose.Types.ObjectId.isValid(IdProduct)) {
        return res.status(400).json({
            status: 'Not Found ID',
            message: 'It is valid ID'
        })
    }

    iphoneModel.findById(IdProduct)
        .then((data) => {
            if (data) {
                return res.status(200).json({
                    status: 'Get By ID Iphone',
                    data
                })
            } else {
                return res.status(400).json({
                    status: 'Bad request',
                    message: 'Not Found Any Iphone'
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


const updateByIdPhone = (req, res) => {
    let iphoneID = req.params.iphoneId
    const { name, description, imageUrl, buyPrice, promotionPrice, amount } = req.body
    console.log(iphoneID);
    if (!mongoose.Types.ObjectId.isValid(iphoneID)) {
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

    iphoneModel.findByIdAndUpdate(iphoneID, update)
        .then((data) => {
            if (data) {
                return res.status(200).json({
                    status: 'Update Iphone By ID Successfully',
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

const deleteIphone = (req, res) => {
    let IdIphone = req.params.iphoneId
    if (mongoose.Types.ObjectId(IdIphone).isValid()) {
        return res.status(400).json({
            status: 'Not Found ID Iphone',
            message: 'It is a valid ID'
        })
    }

    iphoneModel.findByIdAndDelete(IdIphone)
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

module.exports = { postIphone, getAllIphone, getByIDIphone, updateByIdPhone,deleteIphone }
