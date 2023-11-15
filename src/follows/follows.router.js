const router = require('express').Router()

const followServices = require('./follows.services')
const passportJWT = require('../middlewares/auth.middleware')

router.get('/followers', passportJWT.authenticate('jwt', {session: false}) , followServices.getMyFollowers)

router.get('/follows', passportJWT.authenticate('jwt', {session: false}), followServices.getMyFollowings)

module.exports = router