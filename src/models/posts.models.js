/*
    1 Usuario tiene 1 rol
    1 rol pertenece a muchos usuarios
*/

const { DataTypes } = require('sequelize');

const db = require('../utils/database');
//? Importamos modelo que queremos relacionar
const Categories = require('./categories.models');
const Users = require('./users.models');

const Posts = db.define('posts',{
    id: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    tittle : {
        type: DataTypes.STRING,
        allowNull: false
    },
    content : {
        type: DataTypes.TEXT,
        allowNull: false
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            Key: 'id',
            model: Users
        }
    },
    coverUrl: {
        type: DataTypes.STRING
    },
     //? Llave Foranea ->
     //? En sequelize se maneja la sintaxis de CamelCase para las llaves foráneas
     //? a diferencia que en sql tenemos snake_case
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        //? Aquí definimos la relacion con la llave primaria de users.models
        //? Pero en initModels generamos la relación como tal
        references: {
            Key: 'id',          //? References recibe dos opciones -> Key: es el la columna y model: la tabla
            model: Categories
        }
    }
});

module.exports = Posts