import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';

export default function App() {
  const [selectedChat, setSelectedChat] = useState({ wa_id: '', name: '' });
  const [showSidebar, setShowSidebar] = useState(true); // mobile toggle

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className={`${showSidebar ? 'block' : 'hidden'} md:block md:w-1/3 w-full`}>
        <Sidebar
          onSelectChat={(wa_id, name) => {
            setSelectedChat({ wa_id, name });
            setShowSidebar(false); // hide sidebar on mobile
          }}
        />
      </div>

      {/* Chat Window */}
      <div className={`${showSidebar ? 'hidden' : 'block'} md:block md:w-2/3 w-full`}>
        {selectedChat.wa_id ? (
          <ChatWindow
            wa_id={selectedChat.wa_id}
            name={selectedChat.name}
            onBack={() => setShowSidebar(true)} // back button for mobile
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-100">
            <h5>Select a chat to start messaging</h5>
          </div>
        )}
      </div>
    </div>
  );
}
