import { BiEdit, BiTrash, BiShare } from "react-icons/bi";
import { usePosts } from "../../../../Hooks/usePosts";

function PostActions({ post, onClose, edit }) {
  const { removePost, copyPostUrl } = usePosts();

  const handleEdit = () => {
    onClose();
  };

  const handleDelete = () => {
    onClose();
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    onClose();
  };

  return (
    <div className="absolute right-0 top-10 bg-white rounded-lg shadow-lg py-2 w-48 z-10">
      {edit && (
        <button
          onClick={handleEdit}
          className="w-full px-4 py-2 text-left flex items-center space-x-2 hover:bg-gray-100"
        >
          <BiEdit />
          <span>Edit Post</span>
        </button>
      )}
      {edit && (
        <button
          onClick={() => removePost(post._id)}
          className="w-full px-4 py-2 text-left flex items-center space-x-2 hover:bg-gray-100 text-red-500"
        >
          <BiTrash />
          <span>Delete Post</span>
        </button>
      )}
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
