import { API } from "../../../../Api/Api";
import profile from "../../../../assets/profile.jpg";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { useUsers } from "../../../../Hooks/useUsers";
import { useOutletContext } from "react-router-dom";
export function FriendRequest({ item, handleFriendRequestAction }) {
  const { handleAcceptFriend, handleRejectFriend } = useUsers();

  const [loading, setLoading] = useState(false);
  const [matualFriends, setMatualFriends] = useState([]);

  console.log(item);

  const getMutualFriends = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${API.getMutualFriends}/${item.sender}`
      );
      setMatualFriends(response.data);
    } catch (error) {
      console.error(
        error.response?.data?.message ||
          "Something went wrong with fetching mutual friends."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMutualFriends();
  }, [item.sender]);

  const [isClicked, setIsClicked] = useState(false);

  const handleAcceptFriendBtn = async () => {
    await handleAcceptFriend(item.sender);
    // unblockedFriends تعريف بيانات الصديق الجديد بشكل يتطابق مع هيكل unblockedFriends
    const friend = {
      friendId: item.sender,
      profilePicture: item.senderImg, 
      name: item.senderName, 
      isBlocked: false,
      isFriend: true, 
      mutualFriendsCount: matualFriends.length, 
      mutualFriendsIds: matualFriends.map((mf) => mf.id || mf._id || mf), 
    };
    // استدعاء الدالة لإضافة الصديق للقائمة المناسبة
    handleFriendRequestAction(friend, "accept");
    setIsClicked(true);
  };

  const handleRejectFriendBtn = async () => {
    await handleRejectFriend(item.sender);
    handleFriendRequestAction(item, "reject");
    setIsClicked(true);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-center space-x-4">
        <Link to={`/socialHub/profile/${item.sender}`}>
          <img
            src={item.senderImg || profile}
            alt={item.senderName}
            className="w-16 h-16 rounded-full"
          />
        </Link>
        <div>
          <Link
            to={`/socialHub/profile/${item.sender}`}
            className="font-medium"
          >
            {item.senderName}
          </Link>
          <p className="text-sm text-gray-500">
            {loading ? (
              <Skeleton width={100} height={15} />
            ) : (
              `${matualFriends.length} mutual friends`
            )}
          </p>
        </div>
      </div>
      <div className="mt-4 flex space-x-2">
        <button
          onClick={handleAcceptFriendBtn}
          disabled={isClicked}
          className={`flex-1 bg-sec-color trans hover:opacity-90 text-white py-2 rounded ${
            isClicked ? "opacity-60 cursor-not-allowed hover:opacity-50" : ""
          }`}
        >
          Accept
        </button>
        <button
          onClick={handleRejectFriendBtn}
          disabled={isClicked}
          className={`flex-1 bg-gray-200 text-gray-700 trans py-2 rounded hover:bg-gray-300 ${
            isClicked
              ? "opacity-50 cursor-not-allowed hover:opacity-50 bg-gray-300 "
              : ""
          }`}
        >
          Decline
        </button>
      </div>
    </div>
  );
}
