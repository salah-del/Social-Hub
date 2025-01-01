import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { io } from "socket.io-client";
import { API } from "../../../Api/Api";
import { getMsgDateFormatted } from "../../../Utils/getMsgDateFormatted";
import { showToast } from "../../../Utils/showToast";
import Loader from "./../../../Utils/Loader";

const SOCKET_URL = "http://localhost:8800";
const socket = io.connect(SOCKET_URL);
const ChatScreen = ({ chat }) => {
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const chatScreenRef = useRef(null);
  const userId = Cookies.get("userID");

  const groupMessagesByDate = (messages) => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    return messages.reduce((acc, msg) => {
      const msgDate = new Date(msg.timestamp);
      let formattedDate;

      if (msgDate.toDateString() === today.toDateString()) {
        formattedDate = "Today";
      } else if (msgDate.toDateString() === yesterday.toDateString()) {
        formattedDate = "Yesterday";
      } else {
        formattedDate = msgDate.toLocaleDateString();
      }

      if (!acc[formattedDate]) acc[formattedDate] = [];
      acc[formattedDate].push(msg);
      return acc;
    }, {});
  };
  
  useEffect(() => {
    socket.current = io(SOCKET_URL);

    if (userId) {
      // Emit the "add-user" event with the logged-in user's ID
      socket.emit("add-user", userId);
      console.log("User ID sent to server:", userId);
    }

    socket.current.on("connect", () => {
      console.log("Socket connected:", socket.current.id);
    });

    socket.on("msg-recieve", (newMessage) => {
      console.log("new msg : ", newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    socket.current.on("connect_error", (err) => {
      showToast("error", "Socket connection error: " + err.message);
    });

    return () => {
      socket.current.disconnect();
    };
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API.getMessages}`, {
          params: { receiverId: chat.friendId },
        });
        setMessages(res.data);
      } catch (error) {
        showToast("error", "Error fetching chat messages.");
      } finally {
        setLoading(false);
      }
    };

    if (chat?.friendId) {
      fetchMessages();
    }
  }, [chat]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = {
      msg: message,
      senderId: userId,
      to: chat.friendId,
      content: message,
      timestamp: Date.now(),
    };

    const tempMessages = [...messages];
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setMessage("");

    try {
      await axios.post(`${API.SendMessege}`, {
        receiverId: chat.friendId,
        content: newMessage.content,
      });

      socket.current.emit("send-msg", newMessage);
    } catch (error) {
      showToast("error", "Error sending the message.");
      setMessages(tempMessages); // Rollback messages on failure
    }
  };

  useEffect(() => {
    if (chatScreenRef.current) {
      chatScreenRef.current.scrollTo({ top: chatScreenRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [messages]);

  const groupedMessages = groupMessagesByDate(messages);

  return (
    <div className="flex flex-col w-full bg-gray-50">
      <div className="flex items-center justify-between p-4 border-b border-gray-300">
        <h3 className="text-lg font-semibold">{chat.friendName}</h3>
      </div>

      <div ref={chatScreenRef} className="flex-1 overflow-y-auto p-4 space-y-4 chatScreen">
        {loading && (
          <div className="flex items-center h-[467px] justify-center py-4">
            <Loader />
          </div>
        )}
        {!loading &&
          Object.keys(groupedMessages).map((date) => (
            <div key={date} className="space-y-2">
              <div className="text-center text-sm p-2 rounded-md bg-white w-fit mx-auto text-black my-2">
                {date}
              </div>
              {groupedMessages[date].map((msg) => (
                <div key={msg._id} className={`flex ${msg.senderId === userId ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-xs px-4 py-2 rounded-lg text-white ${msg.senderId === userId ? "bg-main-color" : "bg-gray-400"}`}>
                    {msg.content}
                    <span className="block text-right text-xs text-gray-200 mt-1">
                      {getMsgDateFormatted(msg.timestamp)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ))}
      </div>

      <form onSubmit={handleSendMessage} className="flex items-center p-4 border-t border-gray-300">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:border-gray-400"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <input
          type="submit"
          value="Send"
          className="ml-3 px-4 py-2 bg-main-color text-white rounded-md cursor-pointer hover:bg-sec-color"
        />
      </form>
    </div>
  );
};

export default ChatScreen;
