import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Img } from "react-image";
import Skeleton from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import { getMyChats, setActiveChat } from "../../../Redux/slices/userChats";
import checkImageUrl from './../../../Utils/checkImageUrl';
const ChatSidebar = ({ setSelectedChat, friendChat }) => {
  const userId = Cookies.get("userID");
  const {chats, status, error, activeChat} = useSelector((state) => state.userChats);
  const dispatch = useDispatch();
  

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


  const checkImg = async (url) => { 
    await checkImageUrl(url).then((isValid) => {
      if (isValid) {
        return true;
      } else {
        return false;
      }
    });
  }
  
  return (
    <div className="w-full sm:w-1/4 bg-white border-l border-gray-300 py-4">
      {
        status === "loading" && 
        <div className="w-full h-full ">
          {Array.from({ length: chats.length > 0 ? chats.length : 5 }).map((_, index) => (
            <div key={index} className="flex items-center p-3  gap-3 ">
                <Skeleton height="36px" width="36px" borderRadius={"100%"} />
                <div className=" flex flex-col gap-1">
                    <Skeleton height="20px" width="160px" />
                    <Skeleton height="20px" width="80px" />
                </div>
            </div>
          ))}
        </div>
      }
      {/* chats List */}
      <ul>
        {status == "succeeded" && chats.map((contact) =>{
          const chatId = (contact?.receiverId && userId  !== contact?.receiverId) ? contact?.receiverId : 
                          (contact?.senderId && userId  !== contact?.senderId) ? contact?.senderId : null;
          return (
            <li
            key={chatId}
            className={`flex items-center gap-3 p-3 ${activeChat == chatId ? "bg-gray-200" : " hover:bg-gray-200"}  trans cursor-pointer `}
            onClick={() => handleSetSelectedChat(contact)}
          >
            { contact && contact.receiverProfilePicture ? (
              checkImg(contact.receiverProfilePicture) ? 
              <Img
                className="max-w-9 h-9 rounded-full"
                src={contact.receiverProfilePicture}
                loader={
                  <div className="w-9 h-9 rounded-full">
                    <Skeleton height="100%" width="100%" borderRadius={"100%"} />
                  </div>
                }
              /> 
              :
              <FaUserCircle className="text-gray-300 w-9 h-9" />
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
