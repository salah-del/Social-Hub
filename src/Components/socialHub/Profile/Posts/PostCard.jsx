import { useState, useEffect, useRef } from "react";
import { BiLike, BiDotsHorizontalRounded, BiDislike } from "react-icons/bi";
import PostActions from "./PostActions";
import { formatDate } from "../../../../Utils/formatDate";
import checkImageUrl from "../../../../Utils/checkImageUrl";
import { usePosts } from "../../../../Hooks/usePosts";
import CommentsModal from "../Posts/Comments/CommentsModal";
import profile from "../../../../assets/profile.jpg";
function PostCard({ post, user, edit, openComments }) {
  const [showActions, setShowActions] = useState(false);
  const [isValidImage, setIsValidImage] = useState(true);
  // console.log(post);

  useEffect(() => {
    if (post.imgUrl) {
      checkImageUrl(post.imgUrl).then((isValid) => setIsValidImage(isValid));
    }
  }, [post.imgUrl]);

  const { likeAPost, dislikeAPost } = usePosts();
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [isDisliked, setIsDisliked] = useState(post.isDisliked);
  const [likes, setLikes] = useState(post.likes.length);
  const [disLikes, setDisLikes] = useState(post.dislikes.length);

  const [isProcessing, setIsProcessing] = useState(false);
  const handleLike = async () => {
    if (isLiked || isProcessing) return;

    setIsProcessing(true);
    setIsLiked(true);
    setIsDisliked(false);
    setLikes((prev) => prev + 1);
    if (isDisliked) setDisLikes((prev) => prev - 1);

    try {
      await likeAPost(post._id);
    } catch (err) {
      setIsLiked(false);
      setLikes((prev) => prev - 1);
      if (isDisliked) setDisLikes((prev) => prev + 1);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDislike = async () => {
    if (isDisliked || isProcessing) return;

    setIsProcessing(true);
    setIsDisliked(true);
    setIsLiked(false);
    setDisLikes((prev) => prev + 1);
    if (isLiked) setLikes((prev) => prev - 1);

    try {
      await dislikeAPost(post._id);
    } catch (err) {
      setIsDisliked(false);
      setDisLikes((prev) => prev - 1);
      if (isLiked) setLikes((prev) => prev + 1);
    } finally {
      setIsProcessing(false);
    }
  };

  const [isCommentsModalOpen, setIsCommentsModalOpen] = useState(false);
  const [commentsCount, setCommentsCount] = useState(post.comments.length);
  const menuRef = useRef();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowActions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showActions]);

  return (
    <div className="bg-white rounded-lg  p-4 shadow-sm mb-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <img
            src={user.profilePicture || profile}
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
        <div ref={menuRef} className="relative">
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
              setShowActions={setShowActions}
              showActions={showActions}
            />
          )}
        </div>
      </div>

      <p className="mb-0 text-lg text-gray-900 font-semibold">{post.title}</p>
      <p className="mb-4 text-sm text-gray-500">{post.desc}</p>
      {post.imgUrl &&
        (isValidImage ? (
          <img
            src={post.imgUrl}
            alt="Post content"
            className="w-full max-h-[450px] object-cover rounded-lg mb-4"
          />
        ) : (
          <div className="w-full h-80 flex items-center justify-center bg-gray-100 rounded-lg mb-4">
            <p className="text-gray-500">Image not available</p>
          </div>
        ))}

      <div className="flex items-center justify-between pt-3 border-t">
        <div className="flex space-x-4">
          <button
            onClick={handleLike}
            disabled={isLiked}
            className={`flex items-center space-x-1 ${
              isLiked ? "text-main-color" : "text-gray-500 hover:text-gray-600"
            }`}
          >
            <BiLike className="text-xl" />
            <span>{likes}</span>
          </button>
          <button
            onClick={handleDislike}
            disabled={isDisliked}
            className={`flex items-center space-x-1 ${
              isDisliked
                ? "text-main-color"
                : "text-gray-500 hover:text-gray-600"
            }`}
          >
            <BiDislike className="text-xl -mb-1" />
            <span>{disLikes}</span>
          </button>
        </div>
        <div>
          <button
            onClick={() => setIsCommentsModalOpen(true)}
            className={`flex items-center space-x-1 text-gray-500 ${openComments && "hover:underline"}`}
          >
            <span>{commentsCount} Comments</span>
          </button>
        </div>
      </div>
      {isCommentsModalOpen && openComments && (
        <CommentsModal
          post={post}
          user={user}
          edit={edit}
          setCommentsCount={setCommentsCount}
          setModalOpen={setIsCommentsModalOpen}
        />
      )}
    </div>
  );
}

export default PostCard;
