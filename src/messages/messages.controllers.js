const { DataTypes } = require('sequelize');

const db = require('../utils/database');
const Conversations = require('./conversations.models');
const Users = require('./users.models');

const Participants = db.define('participants',{
    id: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    conversationId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Conversations,
            key: 'id'
        }
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Users,
            key: 'id'
        }
    }
});

module.exports = Participants