import React from "react";
import { SlUserFollow, SlUserUnfollow } from "react-icons/sl";
import { BsPersonCheckFill } from "react-icons/bs";
import { FaUserPlus } from "react-icons/fa";
import profile from "../../../assets/profile.jpg";
const PeopleCard = ({ person, handleSubscribe, handleUnsubscribe, handleAddFriend }) => {
  return (
    <div className="flex items-center max-[540px]:flex-col max-[540px]:gap-2 p-5 bg-gray-100 shadow border border-gray-300 rounded-lg hover:shadow-md transition-shadow duration-200">
      {/* صورة المستخدم */}
      <img
        src={person.profilePicture || profile}
        alt={person.name}
        className="w-[96px] h-[96px] rounded-full"
      />

      {/* بيانات المستخدم */}
      <div className="ml-4 flex-1 space-y-1">
        <h2 className="text-xl font-bold text-gray-800">{person.name}</h2>
        <p className="text-sm text-gray-600">{person.mutualFriends || 0} mutual friends</p>
      </div>

      {/* أزرار الإجراءات */}
      <div className="ml-4 flex flex-col max-[540px]:flex-row max-[365px]:flex-col items-end gap-2">
        {person.youFollow ? (
          <button
            onClick={() => handleUnsubscribe(person._id)}
            className="px-4 py-2 bg-sec-color text-white rounded-lg flex items-center hover:bg-main-color transition"
          >
            <SlUserUnfollow className="mr-2" />
            UnFollow
          </button>
        ) : (
          <button
            onClick={() => handleSubscribe(person._id)}
            className="px-[25px] py-2 bg-blue-500 text-white rounded-lg flex items-center hover:bg-blue-600 transition"
          >
            <SlUserFollow className="mr-2" />
            Follow
          </button>
        )}

        {person.sendFriendRequest ? (
          <button
            className="px-[5px] py-2 bg-gray-400 text-white rounded-lg flex items-center hover:bg-gray-500 transition"
          >
            <BsPersonCheckFill className="mr-1" />
            Request Sent
          </button>
        ) : (
          <button
            onClick={() => handleAddFriend(person._id)}
            className="px-2.5 py-2 bg-gray-400 text-white rounded-lg flex items-center hover:bg-gray-500 transition"
          >
            <FaUserPlus className="mr-2" />
            Add Friend
          </button>
        )}
      </div>
    </div>
  );
};

export default PeopleCard;
