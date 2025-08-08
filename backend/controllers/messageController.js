// controllers/messageController.js
const Message = require('../models/Message');

exports.getConversations = async (req, res) => {
    const chats = await Message.aggregate([
        {
            $group: {
                _id: { wa_id: "$wa_id", name: "$name" },
                lastMessage: { $last: "$text" },
                lastTimestamp: { $last: "$timestamp" }
            }
        }
    ]);
    res.json(chats);
};

exports.getMessagesByUser = async (req, res) => {
    const messages = await Message.find({ wa_id: req.params.wa_id }).sort({ timestamp: 1 });
    res.json(messages);
};

exports.sendMessage = async (req, res) => {
    const { wa_id, name, text } = req.body;
    const newMsg = await Message.create({
        wa_id,
        name,
        message_id: `local-${Date.now()}`,
        text,
        timestamp: Date.now().toString(),
        status: 'sent'
    });
    res.json(newMsg);
};

