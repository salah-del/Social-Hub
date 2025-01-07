import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import { Img } from "react-image";
import Skeleton from "react-loading-skeleton";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { getMyChats, setActiveChat } from "../../../Redux/slices/userChats";
const ChatSidebar = ({ setSelectedChat, friendChat }) => {
  const userId = Cookies.get("userID");
  const {chats, status, error, activeChat} = useSelector((state) => state.userChats);
  const dispatch = useDispatch();
  console.log(chats);
  

  useEffect(() => {
    dispatch(getMyChats(friendChat));
  }, [userId]);
  
  const handleSetSelectedChat = (contact, index) => {
    const id = (contact?.receiverId && userId  !== contact?.receiverId) ? contact?.receiverId : 
    (contact?.senderId && userId  !== contact?.senderId) ? contact?.senderId : null;
    let contactSent = { 
      _id: id ,
      name: contact.receiverName,
    }
    setSelectedChat(contactSent);
    dispatch(setActiveChat(id));
  };
  
  return (
    <div className="w-full sm:w-1/4 bg-white border-l border-gray-300 py-4">
      {/* Search Bar */}
      <div className="flex items-center mb-4 px-4">
        <FaSearch className="text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Search contacts..."
          className="w-full text-sm px-3 py-2 border rounded-md focus:outline-none"
        />
      </div>

      {/* chats List */}
      <ul>
        {chats.map((contact) =>{
          const chatId = (contact?.receiverId && userId  !== contact?.receiverId) ? contact?.receiverId : 
                          (contact?.senderId && userId  !== contact?.senderId) ? contact?.senderId : null;
          return (
            <li
            key={chatId}
            className={`flex items-center gap-3 p-3 ${activeChat == chatId ? "bg-gray-200" : " hover:bg-gray-200"}  trans cursor-pointer `}
            onClick={() => handleSetSelectedChat(contact)}
          >
            { contact && contact.receiverProfilePicture ? (
              <Img
                className="max-w-9 h-9 rounded-full"
                src={contact.receiverProfilePicture}
                loader={
                  <div className="w-9 h-9 rounded-full">
                    <Skeleton height="100%" width="100%" borderRadius={"100%"} />
                  </div>
                }
              />
            ) : (
              <FaUserCircle className="text-gray-300 w-9 h-9" />
            )}
            <div>
              <p className="font-semibold text-sm text-gray-700">{contact?.receiverName?.length > 20 ? contact.receiverName.slice(20) + "..." : contact.receiverName}</p>
              <p className="text-sm text-gray-500">{contact.content}</p>
            </div>
          </li>
          )
        })}
      </ul>
    </div>
  );
};

export default ChatSidebar;
