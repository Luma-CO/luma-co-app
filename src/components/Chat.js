import React, { useState } from "react";

const ChatPage = () => {
  const [newChat, setNewChat] = useState("");
  const [messages, setMessages] = useState([]);

  const handleCreateChat = () => {
    if (newChat) {
      setMessages([...messages, { text: newChat, id: messages.length + 1 }]);
      setNewChat("");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-black text-white p-6">
        <h1 className="text-2xl font-bold text-green-600 mb-8">Luma Co</h1>
        <div className="space-y-4">
          <div className="text-green-600 cursor-pointer">Channels</div>
          <div className="text-green-600 cursor-pointer">Direct Messages</div>
          <div className="text-green-600 cursor-pointer">Settings</div>
        </div>
      </div>

      {/* Chat Section */}
      <div className="flex-1 p-8 bg-white">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-green-600">Chats</h1>
          <button
            onClick={handleCreateChat}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            Create Chat
          </button>
        </div>

        <div className="bg-gray-800 p-4 rounded-xl mb-6">
          <input
            type="text"
            value={newChat}
            onChange={(e) => setNewChat(e.target.value)}
            placeholder="Enter a message..."
            className="p-3 text-black w-full rounded-xl"
          />
        </div>

        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className="bg-gray-200 p-4 rounded-xl shadow-sm hover:bg-gray-300 transition duration-200"
            >
              <p className="text-black">{message.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
