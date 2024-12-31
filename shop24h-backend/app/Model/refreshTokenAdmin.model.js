const mongoose = require('mongoose')

const refreshTokenAdminSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin'
    },
    expiredDate: {
        type: Date,
        required: true
    }
})

module.exports = mongoose.model('RefreshTokenAdmin', refreshTokenAdminSchema)