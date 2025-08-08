// utils/processPayload.js
const Message = require('../models/Message');

async function processPayload(payload) {
    const changes = payload.metaData.entry[0].changes[0].value;

    // If it's a new message
    if (changes.messages) {
        const msg = changes.messages[0];
        const contact = changes.contacts ? changes.contacts[0] : null;

        await Message.create({
            wa_id: contact?.wa_id,
            name: contact?.profile?.name,
            message_id: msg.id,
            text: msg.text?.body,
            timestamp: msg.timestamp,
            status: 'sent'
        });
        console.log('📩 New message saved');
    }

    // If it's a status update
    if (changes.statuses) {
        const statusUpdate = changes.statuses[0];
        await Message.findOneAndUpdate(
            { message_id: statusUpdate.id },
            { status: statusUpdate.status }
        );
        console.log(`✅ Status updated to: ${statusUpdate.status}`);
    }
}

module.exports = processPayload;
