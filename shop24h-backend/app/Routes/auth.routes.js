const express = require('express')
const routes = express.Router()
const authMiddleware = require('../Middleware/auth.middleware')
const authController = require('../Controllers/auth.controller')


// user

routes.post('/signup', authMiddleware.checkduplicateUserName, authController.signup)

routes.post('/login', authController.login)

routes.post('/refreshToken', authController.refreshToken)

routes.get('/', authController.getAllUser)

// admin
routes.post('/signup/admin', authMiddleware.checkduplicateAdmin, authController.signupAdmin)
routes.post('/login/admin', authController.loginAdmin)
routes.post('/refreshToken/admin', authController.refreshTokenAdmin)

module.exports = routes