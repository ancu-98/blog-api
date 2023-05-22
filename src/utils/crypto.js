const bcrypt = require('bcrypt');

const hashPassword = (plainPassword) => {
    //? plainPassword -> contraseña en texto plano
    return bcrypt.hashSync(plainPassword,10);
}

//? Coparamos contraseña de texto plano con la contraseña de la base de datos hasPas...
const comparePassword = (plainPassword, hashPassword) => {
    return bcrypt.compareSync(plainPassword, hashPassword)
}

module.exports = {
    hashPassword,
    comparePassword
}
