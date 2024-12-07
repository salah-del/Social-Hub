const PostCard = ({ title, content }) => {
    return (
      <div className="bg-white shadow-md rounded-lg p-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-gray-600">{content}</p>
        <button className="mt-2 text-blue-500 hover:underline">Read More</button>
      </div>
    );
  };
  
  export default PostCard;
  