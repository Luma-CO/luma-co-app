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
    <div className="p-8 ml-64 bg-white">
      <h1 className="text-3xl font-bold text-green-600 mb-6">Chats</h1>

      <div className="bg-gray-800 p-6 rounded-xl mb-6">
        <input
          type="text"
          value={newChat}
          onChange={(e) => setNewChat(e.target.value)}
          placeholder="Nouveau chat..."
          className="p-3 text-black w-full rounded-xl"
        />
        <button
          onClick={handleCreateChat}
          className="mt-4 bg-green-600 text-white p-2 rounded-xl"
        >
          Créer un Chat
        </button>
      </div>

      <div className="space-y-4">
        {messages.map((message) => (
          <div key={message.id} className="bg-gray-200 p-4 rounded-xl">
            <p className="text-black">{message.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatPage;
