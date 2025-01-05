import { useDispatch, useSelector } from "react-redux";
import {
  addComment,
  replyComment,
  getComments,
  deleteComment,
} from "../Redux/slices/commentsReducer";

export const useComments = () => {
  const dispatch = useDispatch();
  const { comments, status, error } = useSelector((state) => state.comments);

  // Fetch Comments for a Post
  const  fetchComments = (postId) => {
    return dispatch(getComments(postId)).unwrap();
  };

  // Add a new Comment
  const createComment = (data) => {
    return dispatch(addComment(data)).unwrap();
  };

  // Reply to a Comment
  const replyToComment = (data) => {
    return dispatch(replyComment(data)).unwrap();
  };

  // Delete a Comment
  const removeComment = (commentId) => {
    return dispatch(deleteComment(commentId)).unwrap();
  };

  return {
    comments,
    status,
    error,
    fetchComments,
    createComment,
    replyToComment,
    removeComment,
  };
};
