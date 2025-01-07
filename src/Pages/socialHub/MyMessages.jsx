import { useEffect, useState } from "react";
import ChatScreen from "../../Components/socialHub/Messages/ChatScreen";
import ChatSidebar from "../../Components/socialHub/Messages/ChatSidebar";
import { useLocation } from "react-router-dom";
import { socket } from "./SocialHubLayout";
import useChat from "../../Hooks/useChat";
import { useDispatch, useSelector } from "react-redux";
import { receiveMessage } from "../../Redux/slices/chatSlice";
import { reorderChatsWhenReceive } from "../../Redux/slices/userChats";

const MyMessages = () => {
  const loc = useLocation();
  const friend = loc.state?.friend || null ; 
  const {isActive} = useSelector((state) => state.userChats);
  const [selectedChat, setSelectedChat] = useState(friend);
  useEffect(() => {
    if (friend) {
      setSelectedChat(friend);
    }
  }, [friend]);

  const dispatch = useDispatch();
  const handleChangeSelectedChat = (chat) => { 
    setSelectedChat(chat);
  }

  useEffect(() => {

    const handleMsgReceive = (newMessage) => {
      console.log("Selected Chat:", selectedChat);

      if (selectedChat && selectedChat._id === newMessage.senderId) {
        dispatch(receiveMessage(newMessage));
      }

      const sender = {
        senderId: newMessage.senderId,
        receiverName: newMessage.senderName,
        receiverProfilePicture: newMessage.senderImg,
        content: newMessage.msg,
      };
      dispatch(reorderChatsWhenReceive(sender));
    };


    // Listen for events
    socket.current.on("msg-recieve", handleMsgReceive);

    return () => {
      // Cleanup listeners
      socket.current.off("msg-recieve", handleMsgReceive);
    };
  }, [dispatch, selectedChat, socket]);

  
  return (
    
    <div className="flex w-[calc(100%+48px)] -m-6 h-[calc(100vh-74px)] border border-gray-100 bg-gray-100">
      {/* Chat Screen */}
      <div className="flex flex-1">
        {selectedChat ? (
          <ChatScreen chat={selectedChat} />
        ) : (
          <div className="flex items-center justify-center w-full text-gray-500">
            Select a chat to start messaging
          </div>
        )}
      </div>
      {/* Sidebar */}
      <ChatSidebar setSelectedChat={handleChangeSelectedChat} friendChat={friend} />
    </div>
  );
};

export default MyMessages;
