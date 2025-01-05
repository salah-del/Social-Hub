import React, { useEffect, useRef, useState } from "react";
import { AiOutlineSend, AiOutlineDelete, AiOutlineLike } from "react-icons/ai";
import { MdOutlineReply } from "react-icons/md";
import { useComments } from "../../../../Hooks/useComments";
import PostCard from "./PostCard";
import profile from "../../../../assets/profile.jpg";

const CommentsModal = ({ post, user, edit, setIsCommentsModalOpen }) => {
  const commentsSectionRef = useRef(null);
  const [newComment, setNewComment] = useState("");
  const [replyToCommentId, setReplyToCommentId] = useState(null);
  const [replyText, setReplyText] = useState("");

  const {
    comments,
    status,
    error,
    fetchComments,
    createComment,
    replyToComment,
    removeComment,
  } = useComments();

  useEffect(() => {
    console.log(comments);
  }, [status]);

  useEffect(() => {
    if (post?._id) {
      fetchComments(post._id);
    }
  }, []);

  useEffect(() => {
    if (commentsSectionRef.current) {
      commentsSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [comments]);

  const handleAddComment = async () => {
    if (newComment.trim()) {
      await createComment({
        desc: newComment,
        objectId: post._id,
      });
      setNewComment("");
    }
  };

  const handleReply = async (commentId) => {
    if (replyText.trim()) {
      await replyToComment({
        desc: replyText,
        objectId: post._id,
        replyTo: commentId,
      });
      setReplyText("");
      setReplyToCommentId(null);
    }
  };

  const handleDeleteComment = async (commentId) => {
    await removeComment(commentId);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={() => setIsCommentsModalOpen(false)}
    >
      <div
        className="bg-white w-full max-w-2xl rounded shadow-xl max-h-[90%] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center py-2 px-4 border-b">
          <h2 className="text-lg font-semibold">{user?.name}'s Post</h2>
          <button
            onClick={() => setIsCommentsModalOpen(false)}
            className="text-gray-500 hover:text-gray-800 text-2xl"
          >
            &times;
          </button>
        </div>

        <div className="overflow-y-auto flex-1">
          <PostCard post={post} user={user} edit={edit} openComments={false} />

          {/* قسم التعليقات مع المرجع (ref) */}
          <div className="py-2 px-4" ref={commentsSectionRef}>
            <h3 className="text-md font-semibold -mt-1 mb-3">Comments</h3>

            {comments.map((comment) => (
              <div key={comment.id} className="flex items-start gap-3 mb-4">
                <img
                  src={
                    comment?.user?.profilePicture ||
                    "https://via.placeholder.com/40"
                  }
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium">
                      {comment?.user?.name || "Unknown User"}
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        className="text-gray-500 hover:text-blue-600"
                        title="Reply"
                        onClick={() => setReplyToCommentId(comment._id)}
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
                  <p className="text-sm text-gray-600">{comment.desc}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <button
                      className="text-xs text-gray-500 hover:text-blue-600"
                      onClick={() => setReplyToCommentId(comment.id)}
                    >
                      Reply
                    </button>
                    <span className="text-xs text-gray-400">
                      {comment.createdAt}
                    </span>
                  </div>

                  {/* ردود على التعليق */}
                  {comment.replies &&
                    comment.replies.map((reply) => (
                      <div key={reply?.id} className="mt-4 ml-8">
                        <div className="flex items-start gap-3 mb-4">
                          <img
                            src={reply?.user?.profilePicture || profile}
                            alt="User Avatar"
                            className="w-8 h-8 rounded-full"
                          />
                          <div className="flex-1">
                            <div className="flex justify-between items-center">
                              <p className="text-sm font-medium">
                                {reply?.user?.name || "Unknown User"}
                              </p>
                              <div className="flex items-center gap-2">
                                <button
                                  className="text-gray-500 hover:text-red-600"
                                  title="Delete"
                                  onClick={() => handleDeleteComment(reply._id)}
                                >
                                  <AiOutlineDelete size={16} />
                                </button>
                              </div>
                            </div>
                            <p className="text-sm text-gray-600">
                              {reply.desc}
                            </p>
                            <div className="flex items-center gap-4 mt-2">
                              <span className="text-xs text-gray-400">
                                {reply?.createdAt}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                  {/* إضافة رد */}
                  {replyToCommentId === comment._id && (
                    <div className="mt-4 ml-8">
                      <textarea
                        placeholder="Write a reply..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        className="w-full border rounded-lg p-2 text-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        rows="2"
                      />
                      <div className="text-right mt-2">
                        <button
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
                          onClick={() => handleReply(comment._id)}
                        >
                          Post Reply
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* قسم إضافة تعليق */}
        <div className="flex items-center py-4 gap-3 rounded-b-lg bg-white border-t px-4">
          <img
            src={user.profilePicture}
            alt={user.name}
            className="w-10 h-10 rounded-full"
          />
          <input
            type="text"
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="flex-1 px-4 max-md:px-0 max-md:pl-1 py-2 border rounded-lg focus:outline-none focus:ring-1 ring-gray-400"
          />
          <button
            className="p-2 bg-sec-color text-white rounded-lg hover:bg-main-color focus:outline-none"
            onClick={handleAddComment}
          >
            <AiOutlineSend size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentsModal;
