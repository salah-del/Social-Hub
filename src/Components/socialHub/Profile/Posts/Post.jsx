import { useState } from "react";
import {
  BiLike,
  BiBookmark,
  BiDotsHorizontalRounded,
  BiDislike,
} from "react-icons/bi";
import PostActions from "./PostActions";
import { useDispatch } from "react-redux";
import {
  copyUrlForPost,
  deletePost,
  dislikePost,
  likePost,
  savePost,
} from "../../../../Redux/slices/postsReducer";

function Post({ post }) {
  const [showActions, setShowActions] = useState(false);
  const dispatch = useDispatch();

  const handleLike = () => dispatch(likePost(post._id));
  const handleDislike = () => dispatch(dislikePost(post._id));
  const handleDelete = () => dispatch(deletePost(post._id));
  const handleSave = () => dispatch(savePost(post._id));
  const handleCopyUrl = () => dispatch(copyUrlForPost(post._id));
  return (
    <div className="bg-white rounded-lg shadow-sm mb-4">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <img
              src={post.authorAvatar}
              alt={post.authorName}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h3 className="font-medium">{post.authorName}</h3>
              <p className="text-sm text-gray-500">{post.timestamp}</p>
            </div>
          </div>
          <div className="relative">
            <button
              onClick={() => setShowActions(!showActions)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <BiDotsHorizontalRounded className="text-xl" />
            </button>
            {showActions && (
              <PostActions post={post} onClose={() => setShowActions(false)} />
            )}
          </div>
        </div>

        <p className="mb-4">{post.content}</p>
        {post.image && (
          <img
            src={post.image}
            alt="Post content"
            className="w-full h-80 object-cover rounded-lg mb-4"
          />
        )}

        <div className="flex items-center justify-between pt-3 border-t">
          <div className="flex space-x-4">
            <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500">
              <BiLike className="text-xl" />
              <span>{post.likes}</span>
            </button>
            <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500">
              <BiDislike className="text-xl -mb-1" />
              <span>{12}</span>
            </button>
          </div>
          <button className="text-gray-500 hover:text-blue-500">
            <BiBookmark className="text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Post;
