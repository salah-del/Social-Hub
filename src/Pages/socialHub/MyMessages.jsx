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
  const friend = loc.state?.friend || null;
  const { isActive } = useSelector((state) => state.userChats);
  const [selectedChat, setSelectedChat] = useState(friend);
  useEffect(() => {
    if (friend) {
      setSelectedChat(friend);
    }
  }, [friend]);

  const dispatch = useDispatch();
  const handleChangeSelectedChat = (chat) => {
    setSelectedChat(chat);
  };

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
    <div className="flex w-[calc(100%+48px)] -m-6 h-[calc(100vh-74px)] border-4 border-gray-600 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200 shadow-xl rounded-lg">
      {/* Chat Screen */}
      <div className="flex flex-1 border-r-4 border-gray-400 shadow-lg hover:shadow-2xl transition duration-300 rounded-tl-lg">
        {selectedChat ? (
          <ChatScreen chat={selectedChat} className="border-2 border-green-400 p-4 bg-white shadow-md rounded-lg" />
        ) : (
          <div className="flex items-center justify-center w-full text-gray-600 font-bold border-2 border-dashed border-green-400 bg-gray-50 rounded-lg">
            Select a chat to start messaging
          </div>
        )}
      </div>
      {/* Sidebar */}
      <ChatSidebar
        setSelectedChat={handleChangeSelectedChat}
        friendChat={friend}
        className="border-l-4 border-gray-400 bg-gradient-to-t from-green-50 to-gray-50 shadow-lg hover:shadow-xl transition duration-300 p-4 rounded-tr-lg"
      >
        <ul className="space-y-2">
          {/** Example contacts list **/}
          <li className="flex items-center space-x-3 p-2 border border-blue-200 rounded-lg hover:bg-blue-100">
            <img src="/path/to/profile.jpg" alt="Avatar" className="w-10 h-10 rounded-full" />
            <div className="text-sm">
              <p className="font-bold text-gray-800">User Name</p>
              <p className="text-gray-500">Last message preview...</p>
            </div>
          </li>
          <li className="flex items-center space-x-3 p-2 border border-blue-200 rounded-lg hover:bg-blue-100">
            <img src="/path/to/profile.jpg" alt="Avatar" className="w-10 h-10 rounded-full" />
            <div className="text-sm">
              <p className="font-bold text-gray-800">Another User</p>
              <p className="text-gray-500">Hello, how are you?</p>
            </div>
          </li>
        </ul>
      </ChatSidebar>
    </div>
  );
};

export default MyMessages;
