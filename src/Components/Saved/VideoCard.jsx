const VideoCard = ({ title }) => {
    return (
      <div className="bg-gray-200 shadow-md rounded-lg p-4 flex flex-col items-center">
        <div className="w-full h-32 bg-gray-400 rounded-md"></div>
        <h3 className="mt-2 text-lg font-semibold">{title}</h3>
        <button className="mt-2 text-blue-500 hover:underline">Watch</button>
      </div>
    );
  };
  
  export default VideoCard;
  