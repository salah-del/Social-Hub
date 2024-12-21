import { BiPlay, BiLike, BiComment, BiShare } from 'react-icons/bi';

export function VideoCard({ video }) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="group relative">
        <div className="aspect-video relative rounded-lg overflow-hidden">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
            <BiPlay className="text-white text-6xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-start space-x-3">
          <img
            src={`https://i.pravatar.cc/40?img=${video.id}`}
            alt={video.author}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h3 className="font-medium text-lg">{video.title}</h3>
            <p className="text-sm text-gray-500">{video.author}</p>
            <p className="text-sm text-gray-500">{video.views.toLocaleString()} views • {video.timestamp}</p>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-4 pt-4 border-t">
          <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-500">
            <BiLike />
            <span>{video.likes}</span>
          </button>
          <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-500">
            <BiComment />
            <span>{video.comments}</span>
          </button>
          <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-500">
            <BiShare />
            <span>Share</span>
          </button>
        </div>
      </div>
    </div>
  );
}