export function FriendRequest({ item }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-center space-x-4">
        <img
          src={item.avatar}
          alt={item.name}
          className="w-16 h-16 rounded-full"
        />
        <div>
          <h3 className="font-medium">{item.name}</h3>
          <p className="text-sm text-gray-500">
            {item.mutualFriends} mutual friends
          </p>
        </div>
      </div>
      <div className="mt-4 flex space-x-2">
        <button className="flex-1 bg-sec-color trans hover:opacity-90 text-white py-2 rounded">
          Accept
        </button>
        <button className="flex-1 bg-gray-200 text-gray-700 trans py-2 rounded hover:bg-gray-300">
          Decline
        </button>
      </div>
    </div>
  );
}
