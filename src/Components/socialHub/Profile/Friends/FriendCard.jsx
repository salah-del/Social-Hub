import { BiMessageRounded} from "react-icons/bi";
import FriendMenu from "./FriendMenu";
import { IoPersonAddSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import profile from "../../../../assets/profile.jpg";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
export function FriendCard({ friend, edit}) {
  const {user:loggedInUser} = useSelector((state) => state.user)
  const [isMyFriend, setisMyFriend] = useState(false)
  

  

  useEffect(() => {
    const isMyFriend = () => { 
      const res = loggedInUser.friends.some((user) => user.friendId == friend.friendId);
      setisMyFriend(res);
    }
    if (loggedInUser)  
      isMyFriend();
  }, [loggedInUser])
  


  console.log(friend);
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <Link to={`/socialHub/profile/${friend.friendId}`}>
            <img
              src={friend.friendProfilePicture || profile}
              alt={friend.friendName}
              className="w-16 h-16 rounded-full"
            />
          </Link>
          <div>
            <Link
              to={`/socialHub/profile/${friend.friendId}`}
              className="font-medium"
            >
              {friend.friendName}
            </Link>
            <p className="text-sm text-gray-500">
              {friend.mutualFriends.length} mutual friends
            </p>
          </div>
        </div>
        {edit && <FriendMenu friend={friend} edit={edit} />}
      </div>
      <div className="flex space-x-2">
        {edit ? (
          <button className="flex-1 flex items-center justify-center space-x-2 text-white bg-gray-400 shadow  hover:bg-gray-500 trans  py-2 rounded ">
            <BiMessageRounded />
            <span>Message</span>
          </button>
        ) : (
          <button className="flex-1 flex items-center justify-center text-white space-x-2 bg-sec-color hover:opacity-90 py-2 rounded">
            <IoPersonAddSharp />
            <span>{isMyFriend ? "Already friend" : "Add Friend"}</span>
          </button>
        )}
      </div>
    </div>
  );
}
