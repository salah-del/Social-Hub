import { useState } from "react";
import CreatePost from "./CreatePost";
import Post from "./Post";

function Posts() {
  // Temporary mock data - replace with actual data fetching
  const [posts] = useState([
    {
      id: 1,
      authorName: "John Doe",
      authorAvatar: "https://i.pravatar.cc/150?img=1",
      content: "Just another day at the office! 💼",
      image: "https://picsum.photos/800/600?random=1",
      likes: 42,
      timestamp: "2 hours ago",
    },
    {
      id: 2,
      authorName: "Jane Smith",
      authorAvatar: "https://i.pravatar.cc/150?img=2",
      content: "Beautiful sunset today! 🌅",
      image: "https://picsum.photos/800/600?random=2",
      likes: 23,
      timestamp: "4 hours ago",
    },
    {
      id: 2,
      authorName: "Jane Smith",
      authorAvatar: "https://i.pravatar.cc/150?img=2",
      content: "Beautiful sunset today! 🌅",
      // image: 'https://picsum.photos/800/600?random=2',
      likes: 23,
      timestamp: "4 hours ago",
    },
  ]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-7">
      <CreatePost />
      <div className="space-y-4">
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default Posts;
