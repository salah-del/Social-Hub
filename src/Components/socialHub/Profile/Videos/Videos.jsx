import React from 'react';
import { VideoCard } from './VideoCard';

export default function Videos() {
  const videos = Array(6).fill(null).map((_, i) => ({
    id: i,
    thumbnail: `https://picsum.photos/400/300?random=${i}`,
    title: `Video Title ${i + 1}`,
    views: Math.floor(Math.random() * 100000),
    likes: Math.floor(Math.random() * 1000),
    comments: Math.floor(Math.random() * 100),
    author: `User ${i + 1}`,
    timestamp: '2 hours ago'
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors">
          Upload Video
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
}