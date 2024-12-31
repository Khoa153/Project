const db = require('../Model')
const User = db.user
const Admin = db.admin
const Roles = db.ROLES
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy


const checkduplicateUserName = async (req, res, next) => {
    try {
        const exitUser = await User.findOne({
            username: req.body.username
        })
        if (exitUser) {
            res.status(400).send({
                message: ' User Name is already in use'
            })
            return
        }
        next()
    } catch (error) {
        console.error('Connect MongoDb ', error)
        process.exit()
    }
}

const checkduplicateAdmin = async (req, res, next) => {
    try {
        const exitAdmin = await Admin.findOne({
            username: req.body.username
        })
        if (exitAdmin) {
            res.status(200).json({
                message: 'Admin Name is Already in use'
            })
            return
        }
        next()
    } catch (error) {
        console.error('Connect MongoDb ', error)
        process.exit()
    }
}



module.exports = { checkduplicateUserName, checkduplicateAdmin }