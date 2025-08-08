import React, { useEffect, useState } from 'react';
import { getMessages, sendMessage } from '../services/api';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';

export default function ChatWindow({ wa_id, name, onBack }) {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (wa_id) {
            getMessages(wa_id).then(res => setMessages(res.data));
        }
    }, [wa_id]);

    const handleSend = (text) => {
        sendMessage({ wa_id, name, text }).then(res => {
            setMessages([...messages, res.data]);
        });
    };

    return (
        <div className="flex flex-col h-full">
            {/* Top Bar */}
            <div className="flex items-center p-4 bg-gray-900 text-white border-b border-gray-700">
                <button className="md:hidden mr-3" onClick={onBack}>⬅</button>
                <div>
                    <div className="font-bold">{name}</div>
                    <div className="text-sm text-gray-300">{wa_id}</div>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-100">
                {messages.map((msg, idx) => (
                    <MessageBubble key={idx} msg={msg} />
                ))}
            </div>

            {/* Input */}
            <MessageInput onSend={handleSend} />
        </div>
    );
}
