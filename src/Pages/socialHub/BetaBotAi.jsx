import React, { useState } from "react";
import axios from "axios";
import { AiOutlineSend } from "react-icons/ai";
import { API } from "../../Api/Api";

const BetaBotAI = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    const userMessage = {
      sender: "user",
      text: userInput,
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setUserInput(""); // Clear input field immediately after sending message

    setIsTyping(true); // Set typing state to true when sending a message

    try {
      const response = await axios.post(API.sendMasgageToChatGPT, {
        prompt: userInput,
      });

      const botResponse = {
        sender: "bot",
        text: response.data.output,
      };

      setMessages((prevMessages) => [...prevMessages, botResponse]);
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: "Oops! Something went wrong." },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="relative max-w-full mx-auto mt-8 bg-gradient-to-r from-blue-50 to-white rounded-lg shadow-lg p-6">
      <div className="relative bg-gradient-to-r from-blue-200 to-gray-100 border border-gray-300 rounded-lg p-4 shadow-xl">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4 text-center">
          AI Chat 4.O
          <span className="text-red-500 italic text-lg ml-2 border border-red-500 rounded-full px-3 py-1 bg-white shadow-sm">
            New
          </span>
        </h1>
      </div>
      <div className="flex gap-6 mt-6">
        <div className="w-1/3 bg-gradient-to-b from-gray-50 to-gray-200 rounded-lg shadow-lg p-4">
          <h2 className="text-lg font-bold text-gray-800">Feature Highlights</h2>
          <ul className="mt-2 text-sm text-gray-600 space-y-2">
            <li>🚀 Fast response times</li>
            <li>💡 Intelligent conversation</li>
            <li>🌟 Easy to use interface</li>
            <li>🔒 Secure and private</li>
          </ul>
        </div>
        <div className="w-2/3 bg-gradient-to-br from-blue-100 via-gray-100 to-gray-200 border border-gray-300 shadow-2xl rounded-3xl flex flex-col h-[70vh]">
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-6 rounded-t-3xl bg-gradient-to-b from-gray-50 to-gray-200 shadow-inner">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                } mb-4 animate-fade-in`}
              >
                <div
                  className={`max-w-[70%] px-5 py-3 rounded-2xl shadow-md transition-transform transform hover:scale-105 ${
                    msg.sender === "user"
                      ? "bg-gradient-to-r from-blue-400 to-blue-600 text-white"
                      : "bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start mb-4 animate-fade-in">
                <div className="max-w-[70%] px-5 py-3 rounded-2xl bg-gray-300 text-gray-800 animate-pulse">
                  Typing...
                </div>
              </div>
            )}
          </div>
          {/* Input Box */}
          <div className="flex items-center p-4 rounded-b-3xl bg-gradient-to-t from-gray-200 to-gray-100 border-t shadow-xl">
            <input
              type="text"
              placeholder="Type your message..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1 px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-main-color transition-all duration-200 bg-gray-50 text-gray-700"
            />
            <button
              onClick={handleSendMessage}
              className="ml-4 p-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-full shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 transform hover:scale-110 transition-all duration-300"
            >
              <AiOutlineSend size={28} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BetaBotAI;
