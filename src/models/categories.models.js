/*
    Una categoria puede pertenecer a muchas publicaciones
    Una publicación pertenece a una  categoria
    La llave Foránea iria en categorias -> porque lleva el muchos
*/
const { DataTypes } = require('sequelize');

const db = require('../utils/database');

const Categories = db.define('categories', {
    id:{  //? ID serializado
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {                //? len : recibe dos parámetros [mínimo, máximo]
            len:[2,50]           //? Validamos que tenga un mínimo de longitud entre 2 - 50 caracteres
                               //? Esto para no recibir Strings vacios
        }
    }
}, {
    timestamps: false         //? No nos agrega columnas UpdatedAt y CreatedAt
})

module.exports = Categories