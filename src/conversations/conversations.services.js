const conversationsControllers = require('./conversations.controllers');

const getAllConversations = (req, res) => {
    conversationsControllers.findAllConversations()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(400).json({ message: err.message })
        })
};

const getConversationById = (req, res) => {
    const id = req.params.conversation_id;
    conversationsControllers.findConversationById(id)
        .then(data => {
            if (data) {
                res.status(200).json(data)
            } else {
                res.status(404).json({ message: 'Invalid Id' })
            }
        })
        .catch(err => {
            res.status(400).json({ message: err.message })
        })
};

const postConversation = (req, res) => {
    const ownerId = req.user.id;
    const { title, image_url, participantId } = req.body;
    conversationsControllers.createConversation({ title, image_url, ownerId, participantId })
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            res.status(400).json({message: err.message,
                fields: {
                    title: 'String',
                    image_url: 'String',
                    participantId : 'UUID'
                }
            })
        })
};

const patchConversation = (req, res) => {
    const id = req.params.conversation_id;
    const {title, image_url} = req.body;
    conversationsControllers.updateConversation(id, {title, image_url})
        .then(data => {
            if(data){
                res.status(200).json({message: `Conversation with id: ${id} updated succesfully!`})
            } else {
                res.status(404).json({message: 'Invalid ID'})
            }
        })
        .catch(err => {
            res.status(400).json({message:err.message})
        })
};

const deleteConversation = (req, res) => {
    const id = req.params.conversation_id
    conversationsControllers.deleteConversation(id)
        .then(data => {
            if(data){
                res.status(204).json()
            } else {
                res.status(404).json({message: 'Invalid ID'})
            }
        })
        .catch(err => {
            res.status(400).json({message:err.message})
        })
}

module.exports = {
    getAllConversations,
    getConversationById,
    postConversation,
    patchConversation,
    deleteConversation
}