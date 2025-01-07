import axios from "axios";
import { API } from "../Api/Api";
import { showToast } from "../Utils/showToast";

const CommentsActionsHook = () => {
  const getComments = async (postId, setComments, setLoading) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API.getComments}/${postId}`);
      setComments(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getRepliesOnComment = async (idComment, setReplies, setLoading) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API.RepliesOnComment}/${idComment}`);
      setReplies(response.data.replies);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const addComment = async (data, setComments) => {
    try {
      setComments((prevComments) => [...prevComments, data]);

      const { userId, ...cleanedData } = data;

      const response = await axios.post(API.addComment, cleanedData);

      setComments((prevComments) => {
        const filteredComments = prevComments.filter(
          (comment) => comment !== data
        );
        return [...filteredComments, response.data.comment];
      });

      showToast("success", "Comment added successfully");
    } catch (error) {
      setComments((prevComments) => {
        const updatedComments = [...prevComments];
        updatedComments.pop();
        return updatedComments;
      });

      // console.error(error);
      showToast("error", "Failed to add comment");
    }
  };

  const replyComment = async (data, setReplies, setRepliesCount) => {
    setRepliesCount((prev) => prev + 1);
    console.log("data = ", data);

    try {
      const response = await axios.post(API.replyComment, data);
      setReplies((prevReplies) => [...prevReplies, response.data.reply]);
      console.log("response.data.reply = ", response.data);

      showToast("success", "Reply added successfully");
    } catch (error) {
      setRepliesCount((prev) => prev - 1);
      console.error(error);
      showToast("error", "Failed to add reply");
    }
  };

  const deleteComment = async (
    idComment,
    setComments,
    setCommentsCount,
    setReplies,
  ) => {
    let previousComments = [];
    let previousReplies = [];

    try {
      setComments((prevComments) => {
        previousComments = [...prevComments];
        return prevComments.filter((comment) => comment._id !== idComment); // إزالة التعليق
      });

      setReplies((prevReplies) => {
        previousReplies = [...prevReplies];
        return prevReplies.filter((reply) => reply.objectId !== idComment); // reply إزالة ال
      });

      await axios.delete(`${API.deleteComment}/${idComment}`);
      setCommentsCount((prev) => prev - 1);
      showToast("success", "Comment deleted successfully");
    } catch (error) {
      setComments(previousComments);
      setReplies(previousReplies);
      showToast("error", "Failed to delete comment");
    }
  };

  return {
    getComments,
    getRepliesOnComment,
    addComment,
    replyComment,
    deleteComment,
  };
};

export default CommentsActionsHook;
