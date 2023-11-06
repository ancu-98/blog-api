const router = require('express').Router()
const passportJWT = require('../middlewares/auth.middleware');
const conversationServices = require('./conversations.services');
const messagesServices = require('../messages/messages.services');
const participantValidate = require('../middlewares/participantValidate.middleware');

router.route('/')    //? /ap1/v1/conversations/
    .get(passportJWT.authenticate('jwt', {session: false}), conversationServices.getAllConversations)
    .post(passportJWT.authenticate('jwt', {session: false}), conversationServices.postConversation)

router.route('/:conversation_id')   //? /api/v1/conversations/:conversation_id
    .get(passportJWT.authenticate('jwt', {session: false}), conversationServices.getConversationById)
    .patch(passportJWT.authenticate('jwt', {session: false}), conversationServices.patchConversation)
    .delete(passportJWT.authenticate('jwt', {session: false}), conversationServices.deleteConversation)

router.route('/:conversation_id/messages')
    .post(passportJWT.authenticate('jwt', {session: false}), participantValidate , messagesServices.postMessage);

router.route('/:conversation_id/messages/:message_id')
    .get(passportJWT.authenticate('jwt', {session: false}), participantValidate, messagesServices.getMessageById )
    .delete(passportJWT.authenticate('jwt', {session: false}), participantValidate, messagesServices.deleteMessage)

module.exports = router;