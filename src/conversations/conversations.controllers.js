const uuid = require('uuid');
const Conversations = require("../models/conversations.models");
const Participants = require('../models/participants.models');
const Users = require('../models/users.models');


const findAllConversations = async() => {
    const data = await Conversations.findAll({
        include: {
            model: Participants,
            include: {
                model: Users
            }
        }
    })
    return data
};

const findConversationById = async(id) => {
    const data = await Conversations.findOne({
        where: {
            id: id
        },
        include: {
            model: Participants,
            include: {
                model: Users
            }
        }

    })
    return data
};

const createConversation = async(obj) => {
    const newConversation = await Conversations.create({
        id: uuid.v4(),
        title: obj.title,
        image_url: obj.image_url,
        userId: obj.ownerId   //? Creador de la conversación (owner)
    })
    const participant1 = await Participants.create({
        id: uuid.v4(),
        userId: obj.ownerId,  //? id del owner -> viene desde el token
        conversationId: newConversation.id
    })
    const participant2 = await Participants.create({
        id: uuid.v4(),
        userId: obj.participantId,  //? id del otro participante -> viene desde el body
        conversationId: newConversation.id
    })
    return {
        newConversation,
        participant1,
        participant2
    }
};

const updateConversation = async(id, obj) => {
    const data = await Conversations.update(obj, {
        where: {
            id : id
        }
    })
    return data[0]
}

const deleteConversation = async (id) => {
    const data = await Conversations.destroy({
        where: {
            id: id
        }
    })
    return data
}

module.exports = {
    findAllConversations,
    findConversationById,
    createConversation,
    updateConversation,
    deleteConversation
}
