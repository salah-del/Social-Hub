import { useDispatch, useSelector } from "react-redux";
import {
  fetchPostsUser,
  addPost,
  deletePost,
  updatePost,
  likePost,
  dislikePost,
  copyUrlForPost,
  savePost,
  unsavePost,
} from "../Redux/slices/postsReducer";

export const usePosts = () => {
  const dispatch = useDispatch();
  const { posts, status, error } = useSelector((state) => state.posts);

  const fetchUserPosts = (userId) => {
    dispatch(fetchPostsUser(userId));
  };

  const createPost = (data) => {
    return dispatch(addPost(data)).unwrap();
  };

  const removePost = (postId) => {
    return dispatch(deletePost(postId)).unwrap();
  };

  const editPost = (postId, data) => {
    return dispatch(updatePost({ idPost: postId, data })).unwrap();
  };

  const likeAPost = (postId) => {
    return dispatch(likePost(postId)).unwrap();
  };

  const dislikeAPost = (postId) => {
    return dispatch(dislikePost(postId)).unwrap();
  };

  const copyPostUrl = (postId) => {
    return dispatch(copyUrlForPost(postId)).unwrap();
  };

  const saveAPost = (postId) => {
    return dispatch(savePost(postId)).unwrap();
  };

  const unsaveAPost = (postId) => {
    return dispatch(unsavePost(postId)).unwrap();
  };

  return {
    posts,
    status,
    error,
    fetchUserPosts,
    createPost,
    removePost,
    editPost,
    likeAPost,
    dislikeAPost,
    copyPostUrl,
    saveAPost,
    unsaveAPost,
  };
};
