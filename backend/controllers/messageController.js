const Message = require('../models/Message');

// ✅ Get all conversations grouped by wa_id with name
exports.getConversations = async (req, res) => {
    try {
        const chats = await Message.aggregate([
            { $sort: { timestamp: -1 } }, // latest first
            {
                $group: {
                    _id: "$wa_id",
                    name: { $first: "$name" },
                    lastMessage: { $first: "$text" },
                    lastTimestamp: { $first: "$timestamp" },
                    status: { $first: "$status" }
                }
            },
            { $sort: { lastTimestamp: -1 } }
        ]);

        res.json(chats);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
};

// ✅ Get all messages for a specific wa_id
exports.getMessagesByWaId = async (req, res) => {
    try {
        const wa_id = req.params.wa_id;
        const messages = await Message.find({ wa_id }).sort({ timestamp: 1 });
        res.json(messages);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
};

// ✅ Add new message (optional)
exports.addMessage = async (req, res) => {
    try {
        const newMsg = new Message(req.body);
        await newMsg.save();
        res.json({ success: true, message: newMsg });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
};
