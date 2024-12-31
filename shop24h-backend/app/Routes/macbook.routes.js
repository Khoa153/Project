const express = require('express')
const macbookController = require('../Controllers/mackbook.controller')
const macbookRoutes = express.Router()

macbookRoutes.post('/macbook',macbookController.postMacbook)

macbookRoutes.get('/macbook',macbookController.getAllMacbook)

macbookRoutes.get('/macbook/:macbookId',macbookController.getByIDMacbook)

macbookRoutes.put('/macbook/:macbookId',macbookController.updateByIdMacbook)

macbookRoutes.delete('/macbook/:macbookId',macbookController.deleteMacbook)

module.exports = macbookRoutes