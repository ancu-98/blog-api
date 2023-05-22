const router = require('express').Router()

const authServices = require('./auth.services')

router.post('/login', authServices.postLogin)

module.exports = router