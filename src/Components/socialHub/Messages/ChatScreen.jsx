import React, { useState } from "react";
import { FaPaperclip, FaSmile } from "react-icons/fa";

const ChatScreen = ({ chat }) => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello!", sender: "me", timestamp: "10:00 AM" },
    { id: 2, text: "Hi! How are you?", sender: "other", timestamp: "10:05 AM" },
  ]);

  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages([
        ...messages,
        { id: messages.length + 1, text: message, sender: "me", timestamp: "Now" },
      ]);
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col w-full  bg-gray-50">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-300">
        <h3 className="text-lg font-semibold">{chat.name}</h3>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === "me" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg text-white ${
                msg.sender === "me" ? "bg-blue-500" : "bg-gray-400"
              }`}
            >
              {msg.text}
              <span className="block text-xs text-gray-200 mt-1">
                {msg.timestamp}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="flex items-center p-4 border-t border-gray-300">
        <button className="mr-3 text-gray-500">
          <FaPaperclip />
        </button>
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 border rounded-md focus:outline-none"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="ml-3 text-gray-500">
          <FaSmile />
        </button>
        <button
          className="ml-3 px-4 py-2 bg-blue-500 text-white rounded-md"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatScreen;
