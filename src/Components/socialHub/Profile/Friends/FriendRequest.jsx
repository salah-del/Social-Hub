export function FriendRequest({ friend }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
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
      <div className="mt-4 flex space-x-2">
        <button className="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Accept
        </button>
        <button className="flex-1 bg-gray-100 text-gray-700 py-2 rounded hover:bg-gray-200">
          Decline
        </button>
      </div>
    </div>
  );
}