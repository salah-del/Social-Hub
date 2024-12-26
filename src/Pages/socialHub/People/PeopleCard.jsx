import React, { useEffect, useState } from "react";
import { SlUserFollow, SlUserUnfollow } from "react-icons/sl";
import { BsPersonCheckFill } from "react-icons/bs";
import { FaUserPlus } from "react-icons/fa";
import profile from "../../../assets/profile.jpg";
import { Link } from "react-router-dom";
import { useUsers } from "../../../Hooks/useUsers";
const PeopleCard = ({ person }) => {
  const { handleSubscribe, handleUnsubscribe, handleAddFriend, error } =
    useUsers();
  const [isFollow, setIsFollow] = useState(person?.youFollow || false);
  const [didSendRequest, setDidSendRequest] = useState(
    person?.sendFriendRequest || false
  );

  useEffect(() => {
    if (error) {
      setIsFollow(person.youFollow);
      setDidSendRequest(person.sendFriendRequest);
    }
  }, [error]);

  const handleUnFollowBtnClicked = () => {
    setIsFollow(false);
    handleUnsubscribe(person._id);
  };

  const handleFollowBtnClicked = () => {
    setIsFollow(true);
    handleSubscribe(person._id);
  };
  const handleAddFriendBtnClicked = () => {
    setDidSendRequest(true);
    handleAddFriend(person._id);
  };

  return (
    <div className="flex items-center max-[540px]:flex-col max-[540px]:gap-2 p-5 bg-gray-100 shadow border border-gray-300 rounded-lg hover:shadow-md transition-shadow duration-200">
      {/* صورة المستخدم */}
      <Link to={`/socialHub/profile/${person._id}`}>
        <img
          src={person.profilePicture || profile}
          alt={person.name}
          className="w-[96px] h-[96px] rounded-full"
        />
      </Link>

      {/* بيانات المستخدم */}
      <Link
        to={`/socialHub/profile/${person._id}`}
        className="ml-4 flex-1 space-y-1"
      >
        <h2 className="text-xl font-bold text-gray-800">{person.name}</h2>
        <p className="text-sm text-gray-600">
          {person.isFollower ? "Following You" : "Not Following You"}
        </p>
      </Link>

      {/* أزرار الإجراءات */}
      <div className="ml-4 flex flex-col max-[540px]:flex-row max-[365px]:flex-col items-end gap-2">
        {/* زر المتابعة/إلغاء المتابعة */}
        {isFollow ? (
          <button
            onClick={handleUnFollowBtnClicked}
            className="px-4 py-2 bg-sec-color text-white    hover:bg-main-color rounded-lg flex items-center transition "
          >
            <SlUserUnfollow className="mr-2" />
            UnFollow
          </button>
        ) : (
          <button
            onClick={handleFollowBtnClicked}
            className="px-[26px] py-2 bg-white hover:bg-gray-50 shadow  rounded-lg flex items-center transition"
          >
            <SlUserFollow className="mr-2" />
            Follow
          </button>
        )}

        {/* زر إرسال طلب صداقة */}
        {didSendRequest ? (
          <button
            className="px-[5px] py-2 bg-gray-500 cursor-not-allowed text-white rounded-lg flex items-center transition"
            disabled
          >
            <BsPersonCheckFill className="mr-1" />
            Request Sent
          </button>
        ) : (
          <button
            onClick={handleAddFriendBtnClicked}
            className="px-2.5 py-2 bg-gray-400 text-white rounded-lg flex items-center transition "
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
