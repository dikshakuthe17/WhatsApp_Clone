import React from 'react';

export default function MessageBubble({ msg }) {
    const isSent = msg.status && ['sent', 'delivered', 'read'].includes(msg.status);

    const getStatusIcon = (status) => {
        if (status === 'sent') return <span className="text-gray-400">✓</span>;
        if (status === 'delivered') return <span className="text-gray-400">✓✓</span>;
        if (status === 'read') return <span className="text-blue-400">✓✓</span>;
        return null;
    };

    // Convert timestamp (seconds) to date+time
    const formattedTime = msg.timestamp
        ? new Date(parseInt(msg.timestamp, 10) * 1000).toLocaleString([], {
            dateStyle: 'short',
            timeStyle: 'short'
        })
        : '';

    return (
        <div className={`flex mb-2 ${isSent ? 'justify-end' : 'justify-start'}`}>
            <div
                className={`p-2 max-w-xs md:max-w-md text-sm shadow 
          ${isSent ? 'bg-green-500 text-white rounded-t-lg rounded-bl-lg' : 'bg-white text-black rounded-t-lg rounded-br-lg'}
        `}
            >
                <p className="mb-1">{msg.text}</p>
                <div className="flex justify-end items-center gap-2 text-xs">
                    <span className="text-gray-200">{formattedTime}</span>
                    {isSent && getStatusIcon(msg.status)}
                </div>
            </div>
        </div>
    );
}
