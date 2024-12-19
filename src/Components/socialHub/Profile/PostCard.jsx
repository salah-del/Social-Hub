import React from "react";
import { useDispatch } from "react-redux";
import { likePost, dislikePost, deletePost, copyUrlForPost, savePost } from "../../../Redux/slices/postsReducer";
import { AiFillLike, AiFillDislike, AiFillDelete, AiOutlineSave, AiOutlineLink } from "react-icons/ai";

const PostCard = ({ post }) => {
  const dispatch = useDispatch();

  const handleLike = () => dispatch(likePost(post._id));
  const handleDislike = () => dispatch(dislikePost(post._id));
  const handleDelete = () => dispatch(deletePost(post._id));
  const handleSave = () => dispatch(savePost(post._id));
  const handleCopyUrl = () => dispatch(copyUrlForPost(post._id));

  return (
    <div className="bg-white border rounded-lg shadow-md p-4 m-2 w-full md:w-1/3">
      <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
      <p className="text-gray-600 mb-4">{post.content}</p>

      <div className="flex justify-between items-center mb-2">
        <div className="flex space-x-3">
          <button
            onClick={handleLike}
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <AiFillLike className="mr-1" /> Like
          </button>
          <button
            onClick={handleDislike}
            className="flex items-center text-red-600 hover:text-red-800"
          >
            <AiFillDislike className="mr-1" /> Dislike
          </button>
          <button
            onClick={handleSave}
            className="flex items-center text-green-600 hover:text-green-800"
          >
            <AiOutlineSave className="mr-1" /> Save
          </button>
          <button
            onClick={handleCopyUrl}
            className="flex items-center text-gray-600 hover:text-gray-800"
          >
            <AiOutlineLink className="mr-1" /> Copy URL
          </button>
        </div>
        <button
          onClick={handleDelete}
          className="flex items-center text-red-600 hover:text-red-800"
        >
          <AiFillDelete className="mr-1" /> Delete
        </button>
      </div>

      <div className="text-sm text-gray-500">
        <span>Likes: {post.likes}</span> | <span>Comments: {post.commentsCount}</span>
      </div>
    </div>
  );
};

export default PostCard;
