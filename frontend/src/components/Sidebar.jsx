import React, { useEffect, useState } from 'react';
import { getConversations } from '../services/api';

export default function Sidebar({ onSelectChat }) {
    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        getConversations().then(res => setConversations(res.data));
    }, []);

    return (
        <div className="bg-gray-900 text-white h-full overflow-y-auto">
            <div className="p-4 text-lg font-semibold border-b border-gray-700">Chats</div>
            {conversations.map((chat, idx) => (
                <div
                    key={idx}
                    className="p-4 hover:bg-gray-800 cursor-pointer border-b border-gray-800"
                    onClick={() => onSelectChat(chat._id.wa_id, chat._id.name)}
                >
                    <div className="font-bold">{chat._id.name}</div>
                    <div className="text-sm text-gray-400 truncate">{chat.lastMessage}</div>
                </div>
            ))}
        </div>
    );
}
