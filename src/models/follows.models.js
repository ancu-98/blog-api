const { DataTypes } = require('sequelize')

const db = require('../utils/database')
const Users = require('./users.models')

const Follows = db.define('follows', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    userId:{
        type: DataTypes.UUID,
        allowNull: false,
        field: 'follower',
        comment: 'Follower',
        references: {
            key: 'id',
            model: Users
        },
    },
    userId2:{
        type: DataTypes.UUID,
        allowNull: false,
        field: 'followed',
        comment: 'Followed',
        references: {
            key: 'id',
            model: Users
        },
    }
}, {
    //? Validacion para evitar seguir a una persona 2 veces
    // uniqueKeys: {
    //     follows_unique: {
    //         fields: ['userId', 'userId2']
    //     }
    // }
})

//? select * from followers inner join users on followers.userId2 = users.id;
//? select * from followers inner join users on followers.userId = users.id;

module.exports = Follows