const express = require('express');
const router = express.Router();

// Controller import
const {
    getConversations,
    getMessagesByWaId,
    addMessage
} = require('../controllers/messageController');

// ✅ Route to get all conversations (grouped by wa_id)
router.get('/chats', getConversations);

// ✅ Route to get messages for a specific wa_id
router.get('/messages/:wa_id', getMessagesByWaId);

// ✅ Route to add a new message (optional if needed)
router.post('/messages', addMessage);

module.exports = router;
