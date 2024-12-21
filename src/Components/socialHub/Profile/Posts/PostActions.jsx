import { BiEdit, BiTrash, BiShare } from 'react-icons/bi';

function PostActions({ post, onClose }) {
  const handleEdit = () => {
    // TODO: Implement edit functionality
    onClose();
  };

  const handleDelete = () => {
    // TODO: Implement delete functionality
    onClose();
  };

  const handleShare = () => {
    // TODO: Implement share functionality (copy URL)
    navigator.clipboard.writeText(window.location.href);
    onClose();
  };

  return (
    <div className="absolute right-0 top-10 bg-white rounded-lg shadow-lg py-2 w-48 z-10">
      <button
        onClick={handleEdit}
        className="w-full px-4 py-2 text-left flex items-center space-x-2 hover:bg-gray-100"
      >
        <BiEdit />
        <span>Edit Post</span>
      </button>
      <button
        onClick={handleDelete}
        className="w-full px-4 py-2 text-left flex items-center space-x-2 hover:bg-gray-100 text-red-500"
      >
        <BiTrash />
        <span>Delete Post</span>
      </button>
      <button
        onClick={handleShare}
        className="w-full px-4 py-2 text-left flex items-center space-x-2 hover:bg-gray-100"
      >
        <BiShare />
        <span>Copy Link</span>
      </button>
    </div>
  );
}

export default PostActions;