const Users = require('../models/users.models');
const  uuid  = require('uuid')
const { hashPassword } = require('../utils/crypto');

const findAllUsers = async() => {
    const data = await Users.findAll()
    return data;
};

const findUserById = async(id) => {
    const data = await Users.findOne({
        where: {
            id: id
        }
    })
    return data;
};

const createUser = async(obj) => {
    const data = await Users.create({
        id : uuid.v4(),
        first_name: obj.first_name,
        last_name: obj.last_name,
        user_name: obj.user_name,
        email: obj.email,
        password: hashPassword(obj.password),
        age: obj.age ,
        role: obj.role,
        country: obj.country
    });
    return data;
};

const findUserByEmail = async (email) => {
    const data = await Users.findOne({
        where: {
            email: email
        }
    })
    return data
};

const updateUser = async (id, obj) => {
    const data = await Users.update(obj, {
        where: {
            id: id
        }
    })
    return data[0] //? Retorna un arreglo, este arreglo puede lucir de estas 2 maneras [1], [0]
}

const deleteUser = async (id) => {
    const data = await Users.destroy({
        where: {
            id: id
        }
    })
    return data //? Retorna 1 en caso de que se haya eliminado, o 0 en caso de que el id no exista
}

module.exports = {
    findAllUsers,
    findUserById,
    createUser,
    findUserByEmail,
    updateUser,
    deleteUser
};