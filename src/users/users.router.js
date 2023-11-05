const router = require('express').Router();

const userServices = require('./users.services');

//? Importamos middleware
const passportJWT = require('../middleWare/auth.middleware');

//! router.get("/" ,passportJWT.authenticate('jwt', {session: false}), userServices.getAllUsers) //? /api/v1/users
//! router.post("/" ,userServices.postUser )     //? /api/v1/users

router.route("/")
    .get(passportJWT.authenticate('jwt', {session: false}), userServices.getAllUsers)
    .post(userServices.postUser)

router.get("/me" , passportJWT.authenticate('jwt', {session: false}), userServices.getMyUser)      //? /api/v1/users/me
router.patch("/me", passportJWT.authenticate('jwt', {session: false}), userServices.patchMyUser)   //? /api/v1/users/me
router.delete("/me", passportJWT.authenticate('jwt', {session: false}), userServices.deleteMyUser) //? /api/v1/users/me

router.get("/:id" , userServices.getUserById )    //? /api/v1/users/:id
router.patch("/:id", userServices.patchUser)      //? /api/v1/users/:id
router.delete("/:id", userServices.deleteUser)    //? /api/v1/users/:id

module.exports = router

