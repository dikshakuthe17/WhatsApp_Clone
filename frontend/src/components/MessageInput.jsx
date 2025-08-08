import React, { useState } from 'react';

export default function MessageInput({ onSend }) {
    const [text, setText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim() === '') return;
        onSend(text);
        setText('');
    };

    return (
        <form className="flex border-t" onSubmit={handleSubmit}>
            <input
                type="text"
                className="flex-1 p-3 outline-none"
                placeholder="Type a message..."
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <button className="bg-green-500 text-white px-4">Send</button>
        </form>
    );
}
