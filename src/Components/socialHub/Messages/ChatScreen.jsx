import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { API } from "../../../Api/Api";
import { getMsgDateFormatted } from "../../../Utils/getMsgDateFormatted";
import { showToast } from "../../../Utils/showToast";

const SOCKET_URL = "http://localhost:8800"; // Replace with your backend URL
const ChatScreen = ({ chat }) => {
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);  // Store real messages here
  const [message, setMessage] = useState("");    // Input message state
  console.log("chat : ", chat);
  const socket = React.useRef(null); // Socket reference

  useEffect(() => {
    // Connect to Socket.IO server
    socket.current = io(SOCKET_URL);
    // Listen for incoming messages
    socket.current.on("message", (newMessage) => {
      console.log("New message received:", newMessage);
      // Add the new message to the state
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    // Clean up the socket connection on component unmount
    return () => {
      socket.current.disconnect();
    };
  }, []);
  useEffect(() => {
    const getMsgs = async () => {
      try {
        setLoading(true);
        console.log(chat.friendId);
        
        // Fetch real messages from the API
        const res = await axios.get(`${API.getMessages}`, {
          params: {
            receiverId: chat.friendId,
          },
        });

        // Update the state with real messages
        setMessages(res.data);  // Set the real messages
        console.log(res.data);   // Log the response to see the data structure

      } catch (error) {
        setLoading(false);
        showToast("error", "Something went wrong with fetching chat messages");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (chat && chat?.friendId) {
      getMsgs();
    }
  }, [chat, chat?.friendId]);
  const userId = Cookies.get("userID");
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (message.trim()) {
      // Create the new message object
      const newMessage = {
        text: message,
        senderId: userId,
        receiverId: chat.friendId,
        content: message,
        timestamp: Date.now(),
      };

      try {
        // Call the API to save the message to the database
        const data = {
          receiverId: chat.friendId,
          content: message,
        }
        await axios.post(`${API.SendMessege}`, data);

        // Emit the message to the backend via Socket.IO
        socket.current.emit("sendMessage", newMessage);

        // Update local state with the new message
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setMessage(""); // Clear input field
      } catch (error) {
        console.error("Error sending message:", error);
        showToast("error", "Something went wrong with sending the message");
      }
    }
  };


  return (
    <div className="flex flex-col w-full bg-gray-50">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-300">
        <h3 className="text-lg font-semibold">{chat.name}</h3>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg._id}  // Use _id from the backend response as the key
            className={`flex ${
              msg.senderId === userId ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg text-white ${
                msg.senderId === userId ? "bg-blue-500" : "bg-gray-400"
              }`}
            >
              {msg.content} {/* Display message content */}
              <span className="block text-xs text-gray-200 mt-1">
                {getMsgDateFormatted(msg.timestamp)}
                {/* {new Date(msg.timestamp).toLocaleTimeString()} */}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <form onSubmit={handleSendMessage} className="flex items-center p-4 border-t border-gray-300">
        {/* <button className="mr-3 text-gray-500">
          <FaPaperclip />
        </button> */}
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:border-blue-400 trans"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        
        <input type="submit" value={"Send"}
          className="ml-3 px-4 py-2 bg-blue-500 text-white rounded-md trans cursor-pointer hover:bg-blue-400"
        />
          
      </form>
    </div>
  );
};

export default ChatScreen;
