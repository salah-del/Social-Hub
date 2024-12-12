import { useState } from "react";
import ChatScreen from "../../Components/socialHub/Messages/ChatScreen";
import ChatSidebar from "../../Components/socialHub/Messages/ChatSidebar";

const MyMessages = () => {
  const [selectedChat, setSelectedChat] = useState(null);

  return (
    <div className="flex w-full -m-7 h-[calc(100vh-4.2rem)] bg-gray-100">
      {/* Sidebar */}
      <ChatSidebar setSelectedChat={setSelectedChat} />

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
    </div>
  );
};

export default MyMessages;
