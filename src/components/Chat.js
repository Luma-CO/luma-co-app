// components/Chat.js
import React, { useState, useEffect } from "react";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const fetchMessages = async () => {
    // Simulation d'une API pour récupérer les messages
    const response = await fetch("/api/messages");
    const data = await response.json();
    setMessages(data);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message) {
      setMessages([...messages, { text: message, user: "Vous" }]);
      setMessage("");
    }
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            <strong>{msg.user}: </strong>
            {msg.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Écrivez un message..."
        />
        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
};

export default Chat;
