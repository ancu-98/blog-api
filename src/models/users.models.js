const { DataTypes } = require('sequelize')

//Importamos base de datos
const db = require('../utils/database')

const Users = db.define('users',{
    id: {
        type: DataTypes.UUID,
        primaryKey:true
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: 'normal'
    },
    country: {
        type: DataTypes.STRING(3)
    }
    /*
        type: DataTypes.STRING()
        defaultvalue: 'active'
    */
});

module.exports = Users;