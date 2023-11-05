const userControllers = require('./users.controllers');

const getAllUsers = (req, res) => {

    console.log('Este es mi req.user: ', req.user)

    userControllers.findAllUsers()
        .then(data => {
            res.status(200).json(data)
        })
        .catch( err => {
            res.status(400).json({message: err.message})
        });
};

const getUserById = (req, res) => {
    const id = req.params.id;
    userControllers.findUserById(id)
        .then( data => {
            if(data) {
                res.status(200).json(data)
            } else {
                res.statud(404).json({message: 'Invalid ID'})
            }
        })
        .catch( err => {
            res.status(400).json({message: err.message})
        });
};

const postUser = (req, res) => {
    const { first_name, last_name, user_name, email, password, age, country } = req.body;
    userControllers.createUser({first_name, last_name, user_name, email, password, age, country})
        .then( data => {
            res.status(201).json(data)
        })
        .catch( err => {
            res.status(400).json({
                message: err.message,
                fields: {
                    first_name: 'string' ,
                    last_name: 'string' ,
                    user_name: 'string' ,
                    email: 'string' ,
                    password: 'string' ,
                    age: 'number' ,
                    country: 'COL'
                }
            })
        });
};

const patchUser = (req, res) => {
    const id = req.params.id
    const {first_name, last_name, user_name, email, password, age, country } = req.body

    userControllers.updateUser(id, {first_name, last_name, user_name, email, password, age, country })
        .then((data) => {
            if(data){
                res.status(200).json({message: 'User Modified Succesfully'})
            } else {
                res.status(404).json({message: 'Invalid ID'})
            }
        })
        .catch((err) => {
            res.status(400).json({message: err.message})
        })
}

const deleteUser = (req, res) => {
    const id = req.params.id;

    userControllers.deleteUser(id)
        .then((data) => {
            if(data){
                res.status(200).json({message: 'User Deleted Succesfully'})
            } else {
                res.status(404).json({message: 'Invalid ID'})
            }
        })
        .catch((err) => {
            res.status(400).json({message: err.message})
        })
}

//? /api/v1/users/me
const getMyUser = (req,res) => {
    const id = req.user.id //? Es obligatorio que la ruta este protegida para acceder a este valor

    userControllers.findUserById(id)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(400).json({message: err.message})
        })
}

const patchMyUser = (req,res) => {
    const id = req.user.id;
    const {first_name, last_name,user_name, age, country} = req.body;

    userControllers.updateUser(id, {first_name, last_name,user_name, age, country})
        .then(data => {
            res.status(200).json({message: 'User Modified Succesfully'})
        })
        .catch(err => {
            res.status(400).json({message: err.message})
        })
};

const deleteMyUser = (req,res) => {
    const id = req.user.id;

    userControllers.deleteUser(id)
        .then(data => {
            res.status(204).json()
        })
        .catch(err => {
            res.status(400).json({message: err.message})
        })
}

module.exports = {
    getAllUsers,
    getUserById,
    postUser,
    patchUser,
    deleteUser,
    getMyUser,
    patchMyUser,
    deleteMyUser
};