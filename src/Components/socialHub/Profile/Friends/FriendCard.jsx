import { BiMessageRounded, BiDotsHorizontalRounded } from 'react-icons/bi';

export function FriendCard({ friend }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <img
            src={friend.avatar}
            alt={friend.name}
            className="w-16 h-16 rounded-full"
          />
          <div>
            <h3 className="font-medium">{friend.name}</h3>
            <p className="text-sm text-gray-500">{friend.mutualFriends} mutual friends</p>
          </div>
        </div>
        <button className="text-gray-500 hover:text-gray-700">
          <BiDotsHorizontalRounded className="text-xl" />
        </button>
      </div>
      <div className="flex space-x-2">
        <button className="flex-1 flex items-center justify-center space-x-2 bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          <BiMessageRounded />
          <span>Message</span>
        </button>
      </div>
    </div>
  );
}