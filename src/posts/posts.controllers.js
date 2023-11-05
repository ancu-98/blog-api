const Posts = require('../models/posts.models');
const uuid = require('uuid');
const Categories = require('../models/categories.models');
const Users = require('../models/users.models');

//? Obtener todos los posts
const findAllPosts = async() => {
    const data = await Posts.findAll({
        attributes: {
            exclude: ['categoryId', 'userId']
        },
        include: [ //? Include nos permite generar joins
            {
                model: Categories //? Hacemos el primer join con categories
            },
            {
                model: Users,  //? Hacemos otro join con Users
                attributes: {  //? Attributes nos permite definir los atributos que queremos mostrar
                    exclude: ['email', 'password', 'role', 'createdAt', 'updatedAt']
                }
            }
        ]
    })
    return data
}

//? Crear nuevos Posts
const createPost = async (obj) => {
    const data = await Posts.create({
        id: uuid.v4(),
        tittle: obj.tittle,
        content: obj.content,
        userId: obj.userId,
        converUrl: obj.coverUrl,
        categoryId: obj.categoryId
    })
    return data
}

module.exports = {
    findAllPosts,
    createPost
}