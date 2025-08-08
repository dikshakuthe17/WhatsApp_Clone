// routes/messages.js
const express = require('express');
const router = express.Router();
const { getConversations, getMessagesByUser, sendMessage } = require('../controllers/messageController');

router.get('/conversations', getConversations);
router.get('/messages/:wa_id', getMessagesByUser);
router.post('/send-message', sendMessage);
router.delete('/delete-message/:id', async (req, res) => {
    const Message = require('../models/Message');
    await Message.deleteOne({ message_id: req.params.id });
    res.json({ success: true });
});


module.exports = router;
