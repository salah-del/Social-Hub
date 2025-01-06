import { BiMessageRounded } from "react-icons/bi";
import FriendMenu from "./FriendMenu";
import { IoPersonAddSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import profile from "../../../../assets/profile.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useUsers } from "../../../../Hooks/useUsers";
import { BsPersonCheckFill } from "react-icons/bs";
import useNavigateTo from "../../../../Utils/navigateTo";
import { clearChat } from "../../../../Redux/slices/chatSlice";
export function FriendCard({ friend, edit, onAction, unblock }) {
  const { user: loggedInUser } = useSelector((state) => state.user);
  const [isMyFriend, setisMyFriend] = useState(false);
  //  console.log(friend);

  useEffect(() => {
    const isMyFriend = () => {
      const res = loggedInUser.friends.some(
        (user) => user.friendId == friend.friendId
      );
      setisMyFriend(res);
    };
    if (loggedInUser) isMyFriend();
  }, [loggedInUser]);

  const { handleAddFriend, error } = useUsers();
  const [didSendRequest, setDidSendRequest] = useState(friend.sentRequest);

  const handleAddFriendBtnClicked = () => {
    setDidSendRequest(true);
    handleAddFriend(friend.friendId);
  };
  const dispatch = useDispatch();
  const navigateTo = useNavigateTo();
  const handleNavToUserChat = () => { 
    dispatch(clearChat());
    navigateTo({
      dest: `/socialHub/myMessages`,
      state: {
        friend: {_id: friend.friendId, name:friend.name, photoUrl:friend.profilePicture},
      }
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <Link to={`/socialHub/profile/${friend.friendId}`}>
            <img
              src={friend.profilePicture || profile}
              alt={friend.name}
              className="w-16 h-16 rounded-full"
            />
          </Link>
          <div>
            <Link
              to={`/socialHub/profile/${friend.friendId}`}
              className="font-medium"
            >
              {friend.name}
            </Link>
            <p className="text-sm text-gray-500">
              {friend.mutualFriendsCount} mutual friends
            </p>
          </div>
        </div>
        <FriendMenu
          friend={friend}
          edit={edit}
          onAction={onAction}
          unblock={unblock}
        />
      </div>
      <div className="flex space-x-2">
        {edit ? (
          <button onClick={handleNavToUserChat} className="flex-1 flex items-center justify-center space-x-2 text-white bg-gray-400 shadow hover:bg-gray-500 trans py-2 rounded ">
            <BiMessageRounded />
            <span>Send Message</span>
          </button>
        ) : friend.friendId === Cookies.get("userID") ? (
          <span className="text-gray-500 text-lg font-semibold mx-auto py-1">
            This is you
          </span>
        ) : isMyFriend ? (
          <button onClick={handleNavToUserChat} className="flex-1 flex w-full items-center justify-center space-x-2 text-white bg-gray-500 shadow hover:bg-gray-600 trans py-2 rounded ">
            <BiMessageRounded />
            <span>Talk to your Friend</span>
          </button>
        ) : didSendRequest ? (
          <button
            className="flex-1 flex items-center justify-center  py-2 bg-gray-500 cursor-not-allowed text-white rounded transition"
            disabled
          >
            <BsPersonCheckFill className="mr-1" />
            Request Sent
          </button>
        ) : (
          <button
            onClick={handleAddFriendBtnClicked}
            className="flex-1 flex items-center justify-center space-x-2 text-white bg-sec-color shadow hover:opacity-90 trans py-2 rounded "
          >
            <IoPersonAddSharp />
            <span>Add Friend</span>
          </button>
        )}
      </div>
    </div>
  );
}
