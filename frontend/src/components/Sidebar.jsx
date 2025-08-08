import React, { useEffect, useState } from 'react';
import { getConversations } from '../services/api';

export default function Sidebar({ onSelectChat }) {
    const [chats, setChats] = useState([]);
    

    useEffect(() => {
        getConversations()
            .then(res => {
                setChats(res.data);
            })
            .catch(err => {
                console.error('Error fetching conversations:', err);
            });
    }, []);

    return (
        <div className="w-1/4 bg-gray-900 text-white overflow-y-auto border-r border-gray-700">
            <div className="p-4 bg-[#202c33] border-b border-gray-700">
                <h2 className="text-lg font-semibold">Chats</h2>
            </div>
            {chats.map(chat => (
                <div
                    key={chat._id}
                    className="p-3 hover:bg-gray-800 cursor-pointer"
                    onClick={() => onSelectChat(chat)}
                >
                    <h4 className="font-bold">{chat.name || chat._id}</h4>
                    <p className="text-gray-400 text-sm truncate">{chat.lastMessage}</p>
                </div>
            ))}
        </div>
    );
}
