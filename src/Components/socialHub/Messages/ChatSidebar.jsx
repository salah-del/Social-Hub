import React, { useEffect, useState } from "react";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import { Img } from "react-image";
import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";
const ChatSidebar = ({ setSelectedChat }) => {
  const { user } = useSelector((state) => state.user);
  const [myContacts, setMyContacts] = useState([]);
  
  useEffect(() => {
    if (user?.friends?.length > 0) {
      setMyContacts(user.friends);
    }
  }, [user]);
  
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
        {myContacts.map((contact) => (
          <li
            key={contact.friendId}
            className="flex items-center gap-3 p-3 hover:bg-gray-200 trans cursor-pointer "
            onClick={() => setSelectedChat(contact)}
          >

            { contact && contact.friendProfilePicture ? (
              <Img
                className="max-w-9 h-9 rounded-full"
                src={contact.friendProfilePicture}
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
              <p className="font-semibold text-sm text-gray-700">{contact?.firendName?.length > 20 ? contact.friendName.slice(20) + "..." : contact.friendName}</p>
              {/* <p className="text-sm text-gray-500">{contact.lastMessage}</p> */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatSidebar;
