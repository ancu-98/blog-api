//? Middleware para proteger mis rutas

//? Passport tiene diferentes estrategias para manejar logins (bearer, jwt, facebook, googfle oath)
const JwtStrategy = require('passport-jwt').Strategy;

//? Extraer el token de los headers de mi petición
const ExtractJwt = require('passport-jwt').ExtractJwt;

//? Importamos librería passport
const passport = require('passport');

//? Importamos palabra secreta
const jwtSecret = require('../../config').api.jwtSecret

//? Importamos controlador para encontrar usuario
const { findUserById } = require('../users/users.controllers');

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'), //? Authorization JWT token
    secretOrKey: jwtSecret
};
passport.use(
    new JwtStrategy(options, async (tokenDecoded, done) => {
        //? done(error, tokenDecoded)
        try {
            const user = await findUserById(tokenDecoded.id)
            if (!user) {
                return done(null, false) //? No existe un error, pero tampoco existe el usuario
            } else {
                return done(null, tokenDecoded) //? No existe un error, pero si un usuario
            }
        } catch (error) {
            return done(error, false) //? Si existe un error, pero no un usuario
        }
    })
);

//? Dentro del toke iría
// {
//     "id": "1234567890",
//     "user_name": "John Doe",
//     "role" : "admin" ,
//     "iat": 1516239022
// }

module.exports = passport

