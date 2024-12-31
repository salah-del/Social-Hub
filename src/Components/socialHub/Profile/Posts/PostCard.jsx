import { useState, useEffect } from "react";
import {
  BiLike,
  BiBookmark,
  BiDotsHorizontalRounded,
  BiDislike,
} from "react-icons/bi";
import PostActions from "./PostActions";
import { formatDate } from "../../../../Utils/formatDate";
import checkImageUrl from "../../../../Utils/checkImageUrl";
import { usePosts } from "../../../../Hooks/usePosts";

function Post({ post, user, edit }) {
  const [showActions, setShowActions] = useState(false);
  const [isValidImage, setIsValidImage] = useState(true);

  useEffect(() => {
    if (post.imgUrl) {
      checkImageUrl(post.imgUrl).then((isValid) => setIsValidImage(isValid));
    }
  }, [post.imgUrl]);

  const { likeAPost, dislikeAPost, saveAPost, unsaveAPost } = usePosts();
  const handleLike = () => likeAPost(post.id);
  const handleDislike = () => dislikeAPost(post.id);
  const handleSave = () => saveAPost(post.id);
  const handleUnsave = () => unsaveAPost(post.id);

  return (
    <div className="bg-white rounded-lg shadow-sm mb-4">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <img
              src={user.profilePicture}
              alt={user.name}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h3 className="font-medium">{user.name}</h3>
              <p className="text-sm text-gray-500">
                {formatDate(user.createdAt)}
              </p>
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
              <PostActions
                post={post}
                edit={edit}
                onClose={() => setShowActions(false)}
              />
            )}
          </div>
        </div>

        <p className="mb-4">{post.desc}</p>
        {post.imgUrl && (
          <>
            {isValidImage ? (
              <img
                src={post.imgUrl}
                alt="Post content"
                className="w-full h-80 object-cover rounded-lg mb-4"
              />
            ) : (
              <div className="w-full h-80 flex items-center justify-center bg-gray-100 rounded-lg mb-4">
                <p className="text-gray-500">Image not available</p>
              </div>
            )}
          </>
        )}

        <div className="flex items-center justify-between pt-3 border-t">
          <div className="flex space-x-4">
            <button
              onClick={() => likeAPost(post._id)}
              className="flex items-center space-x-1 text-gray-500 hover:text-third-color"
            >
              <BiLike className="text-xl" />
              <span>{post.likes.length}</span>
            </button>
            <button onClick={() => dislikeAPost(post._id)} className="flex items-center space-x-1 text-gray-500 hover:text-third-color">
              <BiDislike className="text-xl -mb-1" />
              <span>{post.dislikes.length}</span>
            </button>
          </div>
          <button className="text-gray-500 hover:text-third-color">
            <BiBookmark className="text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Post;
