//? email
//? password
const { findUserByEmail } = require('../users/users.controllers');
const { comparePassword } = require('../utils/crypto')

//? Esta funcion va a validar si los datos pertenecen o no a un usuario
const checkUserCredential = async (email, password) => {
    try {
        const user = await findUserByEmail(email)
        const verifyPassword = comparePassword(password, user.password)
        if(verifyPassword){
            return user
        }
        return null
    } catch (error) {
        return null
    }
}

module.exports = checkUserCredential