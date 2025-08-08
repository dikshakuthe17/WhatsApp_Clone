// models/Message.js
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    wa_id: String,            // WhatsApp ID
    name: String,             // Contact Name
    message_id: String,       // Unique Message ID
    text: String,             // Message body
    timestamp: String,        // Message timestamp
    status: {                 // sent, delivered, read
        type: String,
        default: 'sent'
    }
});

module.exports = mongoose.model('Message', messageSchema);
