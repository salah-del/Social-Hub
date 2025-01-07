import { useEffect, useRef, useState } from "react";
import { AiOutlineSend, AiOutlineDelete } from "react-icons/ai";
import { MdOutlineReply } from "react-icons/md";
import profile from "../../../../../assets/profile.jpg";
import CommentsActionsHook from "../../../../../Hooks/CommentsHook";
import ReplyCard from "./ReplyCard";

const CommentCard = ({
  comment,
  user,
  setComments,
  setCommentsCount,
  borderB,
}) => {
  const [replies, setReplies] = useState([]);
  const [loadingReplies, setLoadingReplies] = useState(false);
  const [repliesCount, setRepliesCount] = useState(
    comment?.replies?.length || 0
  );
  const [replyText, setReplyText] = useState("");
  const [showReplies, setShowReplies] = useState(false);
  const [replyToComment, setReplyToComment] = useState(false);
  console.log(replies);

  useEffect(() => {
    if (repliesCount > 0) {
      getRepliesOnComment(comment._id, setReplies, setLoadingReplies);
    }
  }, [repliesCount]);

  const handleDeleteComment = async (commentId) => {
    await deleteComment(commentId, setComments, setCommentsCount, setReplies);
  };

  const { getRepliesOnComment, replyComment, deleteComment } =
    CommentsActionsHook();

  const handleReply = async (commentID) => {
    if (replyText.trim()) {
      await replyComment(
        { desc: replyText, commentId: commentID },
        setReplies,
        setRepliesCount
      );
      setReplyText("");
      setReplyToComment(false);
    }
  };

  return (
    <div className="flex items-start gap-3 mb-4">
      <img
        src={comment.userId.profilePicture || profile}
        alt="User Avatar"
        className="w-8 h-8 rounded-full"
      />
      <div className={`flex-1 pb-1 ${borderB && "border-b"} border-gray-200`}>
        <div className="flex justify-between items-center">
          {/* User Info */}
          <div className="space-y-1">
            <p className="text-sm font-medium">{comment.userId.name}</p>
            <p className="text-sm text-gray-600">{comment.desc}</p>
          </div>
          {/* Reply, Delete Buttons */}
          <div className="flex items-center gap-2">
            <button
              className="text-gray-500 hover:text-gray-700"
              title="Reply"
              onClick={() => setReplyToComment(!replyToComment)}
            >
              <MdOutlineReply size={16} />
            </button>
            <button
              className="text-gray-500 hover:text-red-600"
              title="Delete"
              onClick={() => handleDeleteComment(comment._id)}
            >
              <AiOutlineDelete size={16} />
            </button>
          </div>
        </div>
        {/* Show Replies Button */}
        {replies && replies.length > 0 && (
          <button
            className="text-sm text-sec-color mt-2"
            onClick={() => setShowReplies(!showReplies)}
          >
            {showReplies
              ? "Hide Replies"
              : `${replies && replies.length} Replies`}
          </button>
        )}

        {/* Show Replies */}
        {showReplies && (
          <div className="mt-4 space-y-4">
            {replies.map((reply, index) => (
              <ReplyCard
                key={index}
                reply={reply}
                handleDeleteComment={handleDeleteComment}
                replyToComment={replyToComment}
                setReplyToComment={setReplyToComment}
              />
            ))}
          </div>
        )}

        {/* Reply Input */}
        {replyToComment && (
          <div className="flex items-center py-4 gap-3 rounded-b-lg ">
            <img
              src={user.profilePicture}
              alt={user.name}
              className="w-10 h-10 rounded-full"
            />
            <input
              type="text"
              placeholder="Write a reply..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className="flex-1 px-4 max-md:px-0 max-md:pl-1 py-2 border rounded-lg focus:outline-none focus:ring-1 ring-gray-400"
            />
            <button
              className="p-2 bg-sec-color text-white rounded-lg hover:bg-main-color focus:outline-none"
              onClick={() => handleReply(comment._id)}
            >
              <AiOutlineSend size={24} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentCard;
