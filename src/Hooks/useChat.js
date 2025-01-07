import axios from "axios";
import { useState } from "react";
// import { socket } from "../Pages/socialHub/SocialHubLayout";
import { API } from "../Api/Api";
import { showToast } from "../Utils/showToast";

const useChat = () => {
    const [loading, setLoading] = useState(true);
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState(null);

    const fetchMessages = async (chatId) => {
        try {
            setLoading(true);
            const res = await axios.get(`${API.getMessages}`, {
                params: { receiverId: chatId },
            });
            setMessages(res.data);
        } catch (error) {
            showToast("error", error?.response?.data?.message || "Error fetching chat messages.");
            setError(error?.response?.data?.message || "Error fetching chat messages.")
        } finally {
            setLoading(false);
        }
    };

    const handleSendMessage = async (message, userId, receiverId) => {
        if (!message.trim()) return;

        const newMessage = {
            msg: message,
            senderId: userId,
            to: receiverId,
            content: message,
            timestamp: Date.now(),
        };

        const tempMessages = [...messages];
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        
        try {
            await axios.post(`${API.SendMessege}`, {
                receiverId: receiverId,
                content: newMessage.content,
            });

            // socket.current.emit("send-msg", newMessage);
        } catch (error) {
            showToast("error", "Error sending the message.");
            setMessages(tempMessages); // Rollback messages on failure
        }
    };

    const receiveNewMessage = (newMessage) => { 
        console.log("sent here  as well", newMessage);
        console.log(messages);
        console.log(newMessage);
        let oldMsgs = messages;
        oldMsgs.push(newMessage);
        setMessages(oldMsgs);
    }
    
    
    return { messages, loading, error,fetchMessages, handleSendMessage, receiveNewMessage };
};

export default useChat;
