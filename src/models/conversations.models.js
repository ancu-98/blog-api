const { DataTypes } = require('sequelize');

const db = require('../utils/database');
const Users = require('./users.models');

const Conversations = db.define('conversations', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [2, 30]
        }
    },
    image_url: {
        type: DataTypes.STRING
    },
    userId: { //Camel Case
        type: DataTypes.UUID,
        allowNull: false,
        references: {   // Crear llave foránea
            model: Users,
            Key: 'id'
        }
    }
});

module.exports = Conversations;