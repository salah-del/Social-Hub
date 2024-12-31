import { useState } from "react";
import ChatScreen from "../../Components/socialHub/Messages/ChatScreen";
import ChatSidebar from "../../Components/socialHub/Messages/ChatSidebar";

const MyMessages = () => {
  const [selectedChat, setSelectedChat] = useState(null);

  return (
    // h-[calc(100vh-122px)]
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
      <ChatSidebar setSelectedChat={setSelectedChat} />
    </div>
  );
};

export default MyMessages;
