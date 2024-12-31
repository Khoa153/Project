const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const db = {};

db.mongoose = mongoose
db.user = require('./user')
db.role = require('./role')
db.admin = require('./admin')
db.refreshToken = require('./refreshToken.model')
db.refreshTokenAdmin = require('./refreshTokenAdmin.model')

db.ROLES = ['user', 'admin', 'moderator']

module.exports = db