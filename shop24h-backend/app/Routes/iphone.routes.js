const express = require('express')
const iphoneController = require('../Controllers/iphone.controllers')
const iphoneRoutes = express.Router()


iphoneRoutes.post('/iphone', iphoneController.postIphone)

iphoneRoutes.get('/iphone', iphoneController.getAllIphone)

iphoneRoutes.get('/iphone/:iphoneId', iphoneController.getByIDIphone)

iphoneRoutes.put('/iphone/:iphoneId', iphoneController.updateByIdPhone)

iphoneRoutes.delete('/iphone/:iphoneId', iphoneController.deleteIphone)

module.exports = iphoneRoutes