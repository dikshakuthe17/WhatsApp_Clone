import React, { useEffect, useState } from "react";
import { getMessages } from "../services/api";
import dayjs from "dayjs";

export default function ChatWindow({ selectedChat }) {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (selectedChat && selectedChat._id) {
            getMessages(selectedChat._id)
                .then((res) => setMessages(res.data))
                .catch((err) => console.error("Error fetching messages:", err));
        }
    }, [selectedChat]);

    if (!selectedChat) {
        return (
            <div className="w-3/4 flex items-center justify-center text-gray-500">
                Select a chat to view messages
            </div>
        );
    }

    // Helper to get message status icon
    const getStatusIcon = (status) => {
        if (status === "sent") return "✓";
        if (status === "delivered") return "✓✓";
        if (status === "read") return "✓✓"; // Will color it blue below
        return "";
    };

    return (
        <div className="w-3/4 flex flex-col bg-[#ece5dd]">
            {/* Header with name & number */}
            <div className="p-4 bg-[#075e54] text-white flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-semibold">
                        {selectedChat.name}{" "}
                        {selectedChat.wa_id ? (
                            <span className="text-sm font-normal opacity-80">
                                ({selectedChat.wa_id})
                            </span>
                        ) : null}
                    </h2>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {messages.map((msg, idx) => (
                    <div
                        key={idx}
                        className={`flex ${msg.from_me ? "justify-end" : "justify-start"}`}
                    >
                        <div
                            className={`relative p-2 rounded-lg max-w-xs text-sm leading-snug shadow-sm ${msg.from_me
                                    ? "bg-[#25d366] text-white rounded-br-none"
                                    : "bg-white text-black rounded-bl-none"
                                }`}
                        >
                            {msg.text}

                            {/* Date & Status */}
                            <div className="flex items-center justify-end mt-1 space-x-1 text-xs opacity-80">
                                <span>
                                    {msg.timestamp && dayjs(msg.timestamp).isValid()
                                        ? dayjs(msg.timestamp).format("DD/MM/YYYY HH:mm")
                                        : ""}
                                </span>
                                <span
                                    className={`${msg.status === "read" ? "text-blue-500" : ""
                                        }`}
                                >
                                    {getStatusIcon(msg.status)}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Input */}
            <div className="flex items-center p-3 bg-gray-100">
                <input
                    type="text"
                    placeholder="Type a message..."
                    className="flex-1 p-2 rounded-full border border-gray-300 focus:outline-none"
                />
                <button className="ml-2 px-4 py-2 bg-[#25d366] text-white rounded">
                    Send
                </button>
            </div>
        </div>
    );
}
