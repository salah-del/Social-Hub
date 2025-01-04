import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import { Img } from "react-image";
import Skeleton from "react-loading-skeleton";
import Cookies from "js-cookie";
import { API } from "../../../Api/Api";
const ChatSidebar = ({ setSelectedChat }) => {
  const userId = Cookies.get("userID");
  const [myContacts, setMyContacts] = useState([]);
  const [isActive, setIsActive] = useState(-1);
  
  useEffect(() => {
    const getFriends = async () => { 
      try {
        const res = await axios.get(API.getUsersInChat);
        console.log(res);
        setMyContacts(res.data.messages);
      } catch (error) {
        
      }
    }
    if (userId) {
      getFriends();
    }
  }, [userId]);
  
  const handleSetSelectedChat = (contact, index) => {
    let contactSent = { 
      _id: (userId  == contact.receiverId) ? contact.senderId : contact.receiverId ,
      name: contact.receiverName,
    }
    setSelectedChat(contactSent);
    setIsActive(index);
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

      {/* Contacts List */}
      <ul>
        {myContacts.map((contact, index) => (
          <li
            key={contact.recieverId}
            className={`flex items-center gap-3 p-3 ${isActive == index ? "bg-gray-200" : " hover:bg-gray-200"}  trans cursor-pointer `}
            onClick={() => handleSetSelectedChat(contact, index)}
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
        ))}
      </ul>
    </div>
  );
};

export default ChatSidebar;
