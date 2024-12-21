import React from 'react';
import { FriendRequest } from './FriendRequest';
import { FriendCard } from './FriendCard';

export default function Friends() {
  const friends = Array(8).fill(null).map((_, i) => ({
    id: i,
    name: `User ${i + 1}`,
    avatar: `https://i.pravatar.cc/150?img=${i}`,
    mutualFriends: Math.floor(Math.random() * 50),
    status: i % 2 === 0 ? 'pending' : i % 2 === 1 ? 'accepted' : 'suggested'
  }));

  const pendingFriends = friends.filter(f => f.status === 'pending');
  const acceptedFriends = friends.filter(f => f.status === 'accepted');

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Friend Requests</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {pendingFriends.map((friend) => (
            <FriendRequest key={friend.id} friend={friend} />
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Your Friends</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {acceptedFriends.map((friend) => (
            <FriendCard key={friend.id} friend={friend} />
          ))}
        </div>
      </div>
    </div>
  );
}